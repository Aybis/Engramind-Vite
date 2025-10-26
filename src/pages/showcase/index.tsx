'use client';
import Cookies from 'js-cookie';
import { PlusIcon } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import useSWR from 'swr';
import {
  AnimatedModal,
  CategoryFilter,
  ScenarioCard,
  ScenarioRoleplayDetail,
  SearchBar,
} from '../../components/ui';
import { ConversationModalForm } from '../../components/ui/showcase/ConversationModalForm';
import { CreationMode } from '../../components/ui/showcase/CreationMode';
import { RoleplayResponse } from '../../interface';
import { axiosElwyn, fetcherBackend } from '../../utils/api';
import { Category, formatNickname, tempName } from '../../utils/helper';
import RenderIf from '../../utils/RenderIf';
import ShowcaseLayout from './ShowcaseLayout';

const MODAL_STATES = {
  CREATION: 'creation',
  CONVERSATION: 'conversation',
  ROLEPLAY_DETAIL: 'roleplay_detail',
} as const;

export default function ScenariosPage() {
  const navigate = useNavigate();
  const email = Cookies.get('email');
  const username = Cookies.get('name');
  const { nickname } = useSelector((state: any) => state.user);

  const [modals, setModals] = useState({
    [MODAL_STATES.CREATION]: false,
    [MODAL_STATES.CONVERSATION]: false,
    [MODAL_STATES.ROLEPLAY_DETAIL]: false,
  });

  const [openPopoverIndex, setOpenPopoverIndex] = useState<number | null>(null);
  const [currentRoleplay, setCurrentRoleplay] =
    useState<RoleplayResponse | null>(null);
  const [conversationId, setConversationId] = useState('');
  const [currentNickname, setCurrentNickname] = useState(nickname || username);

  const { data: totalScenariosData } = useSWR(
    `/quick-roleplay/all/${email}`,
    fetcherBackend,
  );
  const scenarios: RoleplayResponse[] = totalScenariosData?.data || [];

  const toggleModal = useCallback(
    (modalType: keyof typeof modals, value?: boolean) => {
      setModals((prev) => ({
        ...prev,
        [modalType]: value ?? !prev[modalType],
      }));
    },
    [],
  );

  const handleCreationMode = useCallback(
    (mode: Category) => {
      const path = mode === Category.Quick ? 'quick-create' : 'advance-create';
      navigate(`/showcase/roleplay/${path}`);
    },
    [navigate],
  );

  const handleRoleplayClick = useCallback(
    (item: RoleplayResponse) => {
      setCurrentRoleplay(item);
      toggleModal(MODAL_STATES.ROLEPLAY_DETAIL, true);
    },
    [toggleModal],
  );

  const handleCreateConversation = useCallback(
    async (item: RoleplayResponse) => {
      const toastId = toast.loading('Creating conversation...', {
        id: 'create-conversation',
        duration: Infinity,
      });

      try {
        setOpenPopoverIndex(null);
        const { data } = await axiosElwyn.post(
          '/assessment/scenario-conversation/create',
          {
            scenario_id: item.id,
          },
        );

        toast.dismiss(toastId);
        setConversationId(data.data.id);
        setCurrentRoleplay(item);
        toggleModal(MODAL_STATES.CONVERSATION, true);
      } catch (error) {
        toast.error(`${error}`, { id: toastId, duration: 4000 });
      }
    },
    [toggleModal],
  );

  useEffect(() => {
    if (nickname) setCurrentNickname(nickname);
  }, [nickname]);

  return (
    <>
      <ShowcaseLayout>
        <div>
          <div className="flex md:flex-row flex-col justify-between items-center mb-2">
            <div>
              <h1 className="text-3xl font-bold mb-2 capitalize">
                Welcome, {formatNickname(currentNickname)}
              </h1>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Create and manage your roleplay scenarios
              </p>
            </div>

            <RenderIf condition={tempName.includes(currentNickname)}>
              <button
                onClick={() => toggleModal(MODAL_STATES.CREATION, true)}
                className="flex items-center gap-x-2 bg-purple-600/90 dark:bg-purple-600/80 backdrop-blur-xl border border-purple-400/30 dark:border-purple-500/30 text-white px-6 py-3 rounded-xl hover:bg-purple-700/90 dark:hover:bg-purple-700/80 hover:border-purple-500/40 transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl md:mb-0 mb-5"
              >
                <PlusIcon className="h-4 w-4" />
                <span>New Roleplay</span>
              </button>
            </RenderIf>
          </div>

          <SearchBar title="Roleplay" showRoleOption />
          <CategoryFilter />

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {scenarios.map((item, index) => (
              <ScenarioCard
                key={item.id}
                item={item}
                index={index}
                setOpenPopoverIndex={setOpenPopoverIndex}
                openPopoverIndex={openPopoverIndex}
                handleCreateConversation={handleCreateConversation}
                onRoleplaySelected={handleRoleplayClick}
              />
            ))}
          </div>
        </div>
      </ShowcaseLayout>

      {/* Modals rendered outside ShowcaseLayout to overlay entire screen */}
      <AnimatedModal
        usingBackgroundWCard={false}
        widthFitContainer
        isOpen={modals[MODAL_STATES.CREATION]}
        onClose={() => toggleModal(MODAL_STATES.CREATION, false)}
      >
        <CreationMode
          onChooseMode={handleCreationMode}
          onClose={() => toggleModal(MODAL_STATES.CREATION, false)}
        />
      </AnimatedModal>

      <ConversationModalForm
        isOpen={modals[MODAL_STATES.CONVERSATION]}
        onClose={() => toggleModal(MODAL_STATES.CONVERSATION, false)}
        conversationId={conversationId}
        currentConversation={currentRoleplay}
      />

      <AnimatedModal
        isOpen={modals[MODAL_STATES.ROLEPLAY_DETAIL]}
        usingBackgroundWCard={false}
        onClose={() => toggleModal(MODAL_STATES.ROLEPLAY_DETAIL, false)}
      >
        <ScenarioRoleplayDetail item={currentRoleplay} />
      </AnimatedModal>
    </>
  );
}
