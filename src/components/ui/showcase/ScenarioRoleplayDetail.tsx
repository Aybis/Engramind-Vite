import { RoleplayResponse } from '../../../interface';
import { AnimatedCollapse } from '../AnimatedCollapse';

interface Props {
  item: RoleplayResponse | null;
}

export const ScenarioRoleplayDetail = ({ item }: Props) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl">
      <div className="flex items-start space-x-6 mb-6">
        <img
          src={
            item?.description?.charactersGender === 'Male'
              ? '/assets/male_persona.avif'
              : '/assets/female_persona.webp'
          }
          className="w-32 h-32 rounded-2xl object-cover"
        />
        <div className="flex-1">
          <h2 className="text-3xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-2.5">
            Hello
          </h2>
          <h2 className="text-xl font-semibold flex items-center gap-2 text-gray-900 dark:text-white mb-4">
            My name is{' '}
            <span className="text-purple-600 dark:text-purple-400">
              {item?.description?.charactersName}
              <span className="text-gray-900 dark:text-white">,</span>
            </span>
            I am{' '}
            <span className="text-purple-600 dark:text-purple-400">
              {item?.description?.charactersAge}
            </span>
            years old.
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300">
            {item?.description?.charactersBackground}
          </p>
        </div>
      </div>
      <AnimatedCollapse title="Character Details">
        <div className="space-y-2 text-gray-900 dark:text-white">
          <p>
            <span className="font-bold">Gender:</span>{' '}
            {item?.description?.charactersGender}
          </p>
          <p>
            <span className="font-bold">Occupation:</span>{' '}
            {item?.description?.charactersOccupation}
          </p>
        </div>
      </AnimatedCollapse>
      <AnimatedCollapse title="Scenario Detail">
        <div className="space-y-2 text-gray-900 dark:text-white">
          <p>
            <span className="font-bold">Scenario Snippet:</span>{' '}
            {item?.description?.charactersScenarioSnippet}
          </p>
          <p>
            <span className="font-bold">Relevance To Scenario:</span>{' '}
            {item?.description?.charactersRelevanceToScenario}
          </p>
        </div>
      </AnimatedCollapse>
    </div>
  );
};
