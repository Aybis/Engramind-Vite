import { SquarePen } from 'lucide-react';
import { PersonaData } from '../../../interface';
import {
  formatBackgroundInput,
  personalDetailsData,
  personalityProfileData,
} from '../../../utils/helper';
import { ProgressBar } from './ProgressBar';

interface Props {
  persona: PersonaData | null;
  onEditPress?: () => void;
}

export const PersonaDetails = ({ persona, onEditPress }: Props) => {
  return (
    <div className="h-[72vh] bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl ">
      <p className="font-bold text-xl text-gray-900 dark:text-white">
        Detail Persona
      </p>
      <div className="relative h-[62vh] pb-4 overflow-y-auto">
        {onEditPress && (
          <button
            type="button"
            onClick={onEditPress}
            className="cursor-pointer focus-visible:ring-ring inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 disabled:pointer-events-none disabled:opacity-50 border-zinc-300 bg-purple-500 dark:bg-zinc-900 hover:bg-accent hover:text-accent-foreground border shadow-sm h-9 w-9 absolute top-4 right-4"
          >
            <SquarePen size={15} />
          </button>
        )}
        <div>
          <p className="text-center dark:text-white text-black text-[26px] font-bold">
            {persona?.persona_details?.name}
          </p>
          <div className="flex md:flex-row flex-col gap-x-2 items-center justify-center text-gray-500 dark:text-zinc-400 mt-2">
            <p>{persona?.persona_details?.occupation}</p>
            <span className="md:block hidden">•</span>
            <p>{persona?.persona_details?.age} years old</p>
            <span className="md:block hidden">•</span>
            <p>{persona?.persona_details?.nationality}</p>
          </div>
        </div>
        <div className="flex flex-col gap-4">
          <div className="grid md:grid-cols-2 gap-4 mt-5">
            <div className="w-full bg-gray-50 dark:bg-zinc-800 rounded-lg p-5">
              <p className="font-bold text-[18px] text-gray-900 dark:text-white">
                Personal Details
              </p>
              {personalDetailsData(persona).map((personalDetail) => (
                <div key={personalDetail.id} className="my-3">
                  <p className="text-gray-500 dark:text-zinc-400 text-sm">
                    {personalDetail?.title}
                  </p>
                  <p className="text-md text-gray-900 dark:text-white">
                    {personalDetail?.value}
                  </p>
                </div>
              ))}
            </div>
            <div className="w-full bg-gray-50 dark:bg-zinc-800 rounded-lg p-5">
              <p className="font-bold text-[18px] text-gray-900 dark:text-white">
                Personality Profile
              </p>
              <div className="mt-2 space-y-4">
                {personalityProfileData(persona).map((personalityProfile) => (
                  <div
                    key={personalityProfile.id}
                    className="grid grid-cols-[120px,1fr,40px] items-center gap-4"
                  >
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                      {personalityProfile?.title}
                    </p>
                    <ProgressBar
                      className="col-span-1 w-full"
                      value={parseFloat(personalityProfile?.value)}
                    />
                    <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                      {personalityProfile?.value}%
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-x-4 mt-4">
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                  MBTI: {persona?.persona_details?.personalityTraits?.mbtiType}
                </p>
                <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400 capitalize">
                  Enneagram:{' '}
                  {persona?.persona_details?.personalityTraits?.enneagramType}
                </p>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-50 dark:bg-zinc-800 rounded-lg p-5">
            <p className="font-bold text-[18px] text-gray-900 dark:text-white">
              Background
            </p>
            <div className="my-3">
              <p
                dangerouslySetInnerHTML={{
                  __html: formatBackgroundInput(
                    persona?.persona_details?.background ?? '',
                  ),
                }}
                className="text-sm text-gray-700 dark:text-gray-300"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="w-full bg-gray-50 dark:bg-zinc-800 rounded-lg p-5">
              <p className="font-bold text-[18px] text-gray-900 dark:text-white">
                Skills & Abilities
              </p>
              <div className="my-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {persona?.persona_details?.skillsAndAbilities}
                </p>
              </div>
            </div>
            <div className="w-full bg-gray-50 dark:bg-zinc-800 rounded-lg p-5">
              <p className="font-bold text-[18px] text-gray-900 dark:text-white">
                Motivations & Goals
              </p>
              <div className="my-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  {persona?.persona_details?.motivationsAndGoals}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
