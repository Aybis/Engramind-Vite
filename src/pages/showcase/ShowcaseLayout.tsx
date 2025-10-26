import {
  AnimatedModal,
  LogoutForm,
  ShowcaseHeader,
  SideDrawer,
  UpdateNicknameForm,
} from '../../components/ui';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ThemeToggle from '../../theme/theme-toggle';
import { useNavigate } from 'react-router-dom';
import { formatNickname, navbarLinkData } from '../../utils/helper';
import { NavbarLinkData } from '../../interface';
import { toast } from 'sonner';
import { useDispatch, useSelector } from 'react-redux';
import { resetState, settingNickname } from '../../stores/user-slice';
import Cookies from 'js-cookie';

export default function Layout({ children }: { children: React.ReactNode }) {
  const email = Cookies.get('email');
  const username = Cookies.get('name');
  const dispatch = useDispatch();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [showUpdateNickname, setShowUpdateNickname] = useState(false);
  const { nickname } = useSelector((state: any) => state.user);

  const [currentNickname, setCurrentNickname] = useState(nickname || username);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleUpdateNickname = async (value: string) => {
    const toastId = toast.loading('Updating nickname...', {
      id: 'update-nickname',
      duration: Infinity,
    });
    try {
      setLoading(true);
      dispatch(settingNickname(value));
      Cookies.set('nickname', value);
      setLoading(false);
      toast.success('Nickname updated successfully!', {
        id: toastId,
        duration: 4000,
      });
      setShowUpdateNickname(false);
    } catch (e) {
      toast.error(e?.toString(), {
        id: toastId,
        duration: 4000,
      });
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    document.cookie.split(';').forEach((c) => {
      document.cookie = c
        .replace(/^ +/, '')
        .replace(/=.*/, '=;expires=' + new Date().toUTCString() + ';path=/');
    });
    Cookies.set('access_token', '');
    Cookies.set('name', '');
    Cookies.set('refresh_token', '');
    Cookies.set('email', '');
    dispatch(resetState());
    navigate('/');
  };
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (nickname) {
      setCurrentNickname(nickname);
    }
  }, [nickname]);

  return (
    <>
      <div
        className="min-h-screen bg-cover bg-center bg-no-repeat bg-fixed bg-white dark:bg-zinc-900 backdrop-blur-2xl"
        style={{ backgroundImage: 'url(/assets/bg/background.png)' }}
      >
        <div className="relative min-h-screen overflow-auto">
          <ShowcaseHeader
            setShowUpdateNickname={setShowUpdateNickname}
            setShowConfirm={setShowConfirm}
            setIsOpenDrawer={setIsOpenDrawer}
            name={email ?? ''}
            currentNickname={currentNickname}
          />
          <div className="max-w-7xl mx-auto mt-16">
            <div className="bg-white/20 dark:bg-zinc-900/30 backdrop-blur-2xl rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.15)] dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] border border-white/20 dark:border-white/10 p-8">
              <div className="text-neutral-900 dark:text-neutral-100">
                {children}
              </div>
            </div>
          </div>
        </div>
        <SideDrawer
          isOpen={isOpenDrawer}
          onClose={() => {
            setIsOpenDrawer(false);
          }}
        >
          <nav className="gap-6 text-md flex flex-col text-gray-700 dark:text-gray-300 leading-relaxed">
            {navbarLinkData.map((linkData: NavbarLinkData, index: number) => (
              <Link
                key={linkData.id + index.toString()}
                to={linkData.href}
                className={`hover:text-purple-600 dark:hover:text-purple-400 ${
                  (linkData?.includes &&
                    pathname?.includes(linkData?.includes)) ||
                  pathname === linkData?.href
                    ? 'text-purple-600 font-bold'
                    : ''
                }`}
              >
                {linkData.title}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4 items-start mt-5 relative">
            <div className="flex gap-x-2 justify-center items-center">
              <img
                // onClick={() => setShowUpdateNickname(true)}
                src="/assets/male_persona.avif"
                alt="Profile"
                className="rounded-full w-8 h-8 cursor-pointer hover:shadow-lg transition-all duration-300"
                width={400}
                height={300}
              />
              <div
                // onClick={() => setShowUpdateNickname(true)}
                className="text-sm cursor-pointer text-purple-600 dark:text-purple-300 capitalize font-semibold"
              >
                {formatNickname(currentNickname)}
              </div>
            </div>
            <button
              onClick={() => setShowConfirm(true)}
              className="text-sm text-red-600 dark:text-red-400 hover:underline cursor-pointer transition"
            >
              Logout
            </button>
            <ThemeToggle customClassName="" />
          </div>
        </SideDrawer>
      </div>

      {/* Modals rendered outside the main container to overlay entire screen */}
      <AnimatedModal
        showCrossIcon={false}
        widthFitContainer
        isOpen={showConfirm}
        onClose={() => setShowConfirm(false)}
        usingBackgroundWCard={false}
      >
        <LogoutForm
          handleLogout={handleLogout}
          setShowConfirm={setShowConfirm}
        />
      </AnimatedModal>
      <AnimatedModal
        customWidth="w-full md:w-[50%]"
        isOpen={showUpdateNickname}
        onClose={() => {
          if (loading) return;
          setShowUpdateNickname(false);
        }}
      >
        <UpdateNicknameForm
          loading={loading}
          currentNickname={currentNickname}
          handleUpdateNickname={handleUpdateNickname}
          setShowUpdateNickname={setShowUpdateNickname}
        />
      </AnimatedModal>
    </>
  );
}
