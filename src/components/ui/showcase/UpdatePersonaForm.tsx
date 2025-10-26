import { FormikProps } from 'formik';
import { EditFormValues } from '../../../formik/interface';
import { AnimatedSpinner } from '../AnimatedSpinner';

interface UpdatePersonaForm {
  loading: boolean;
  updateFormik: FormikProps<EditFormValues>;
  setIsOpen: (value: boolean) => void;
}

export const UpdatePersonaForm = ({
  loading,
  updateFormik,
  setIsOpen,
}: UpdatePersonaForm) => {
  const disableButton = loading || !updateFormik.isValid;

  const inputClassName = `w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
    loading
      ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
      : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
  }`;

  const textareaClassName = `w-full border rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
    loading
      ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
      : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
  }`;

  return (
    <form
      onSubmit={updateFormik.handleSubmit}
      className="h-[72vh] bg-white dark:bg-zinc-900 p-8 rounded-2xl w-4xl shadow-2xl"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-6">
        Edit Persona: {updateFormik.values.name}
      </h2>

      {/* form content */}
      <div className="gap-y-4 flex flex-col h-[55vh] overflow-y-scroll px-2">
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="persona_name"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Name
            </label>
            <input
              id="persona_name"
              name="persona_name"
              type="text"
              value={updateFormik.values.persona_name}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Raditya Dika"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="age"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Age
            </label>
            <input
              id="age"
              name="age"
              value={updateFormik.values.age}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                updateFormik.setFieldValue('age', digitsOnly);
              }}
              onBlur={updateFormik.handleBlur}
              type="text"
              placeholder="38"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="gender"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Gender
            </label>
            <input
              id="gender"
              name="gender"
              type="text"
              value={updateFormik.values.gender}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Male"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="occupation"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Occupation
            </label>
            <input
              type="text"
              name="occupation"
              id="occupation"
              value={updateFormik.values.occupation}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Writer, Comedian, Filmmaker"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="language"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Language
            </label>
            <input
              type="text"
              name="language"
              id="language"
              value={updateFormik.values.language}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Bahasa Indonesia (Iasth)"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="hometown"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hometown
            </label>
            <input
              type="text"
              name="hometown"
              id="hometown"
              value={updateFormik.values.hometown}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Jakarta, Indonesia"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="birthdate"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Birthdate
            </label>
            <input
              type="text"
              name="birthdate"
              id="birthdate"
              value={updateFormik.values.birthdate}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="28-12-1984"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="nationality"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Nationality
            </label>
            <input
              type="text"
              name="nationality"
              id="nationality"
              value={updateFormik.values.nationality}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Indonesian"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="background"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Background
            </label>
            <textarea
              rows={6}
              name="background"
              id="background"
              value={updateFormik.values.background}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder='--- Input Content Provided: ---&#10;As the "Neurotic Male," Raditya Dika is the writer who pioneered Indonesia&apos;s "comedy diary" genre...'
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="scenarioSnippet"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Scenario Snippet
            </label>
            <textarea
              rows={4}
              name="scenarioSnippet"
              id="scenarioSnippet"
              value={updateFormik.values.scenarioSnippet}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Raditya is asked to give a commencement speech..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mt-2">
          Personality traits
        </h2>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="mbtiType"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              MBTI Type
            </label>
            <input
              type="text"
              name="mbtiType"
              id="mbtiType"
              value={updateFormik.values.mbtiType}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="ENFP"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="enneagramType"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Enneagram Type
            </label>
            <input
              type="text"
              name="enneagramType"
              id="enneagramType"
              value={updateFormik.values.enneagramType}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="7w6"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <h2 className="text-base font-semibold flex items-center gap-2 text-gray-900 dark:text-white mt-2">
          Big Five Personality Scores (1-100)
        </h2>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="w-full">
            <label
              htmlFor="openness"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Openness
            </label>
            <input
              type="text"
              name="openness"
              id="openness"
              value={updateFormik.values.openness}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                updateFormik.setFieldValue('openness', digitsOnly);
              }}
              onBlur={updateFormik.handleBlur}
              placeholder="75"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="conscientiousness"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Conscientiousness
            </label>
            <input
              type="text"
              name="conscientiousness"
              id="conscientiousness"
              value={updateFormik.values.conscientiousness}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                updateFormik.setFieldValue('conscientiousness', digitsOnly);
              }}
              onBlur={updateFormik.handleBlur}
              placeholder="50"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="extraversion"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Extraversion
            </label>
            <input
              type="text"
              name="extraversion"
              id="extraversion"
              value={updateFormik.values.extraversion}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                updateFormik.setFieldValue('extraversion', digitsOnly);
              }}
              onBlur={updateFormik.handleBlur}
              placeholder="70"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="agreeableness"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Agreeableness
            </label>
            <input
              type="text"
              name="agreeableness"
              id="agreeableness"
              value={updateFormik.values.agreeableness}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                updateFormik.setFieldValue('agreeableness', digitsOnly);
              }}
              onBlur={updateFormik.handleBlur}
              placeholder="60"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="neuroticism"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Neuroticism
            </label>
            <input
              type="text"
              id="neuroticism"
              name="neuroticism"
              value={updateFormik.values.neuroticism}
              onBlur={updateFormik.handleBlur}
              onChange={(e) => {
                const digitsOnly = e.target.value.replace(/\D/g, '');
                updateFormik.setFieldValue('neuroticism', digitsOnly);
              }}
              placeholder="80"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="skillsAndAbilities"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Skills and Abilities
            </label>
            <textarea
              rows={4}
              id="skillsAndAbilities"
              name="skillsAndAbilities"
              value={updateFormik.values.skillsAndAbilities}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter skills and abilities..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="motivationsAndGoals"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Motivations and Goals
            </label>
            <textarea
              rows={4}
              id="motivationsAndGoals"
              name="motivationsAndGoals"
              value={updateFormik.values.motivationsAndGoals}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter motivations and goals..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <h2 className="text-xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mt-2">
          Physical Description
        </h2>
        <div className="grid grid-cols-3 gap-4 w-full">
          <div className="w-full">
            <label
              htmlFor="build"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Build
            </label>
            <input
              type="text"
              id="build"
              name="build"
              value={updateFormik.values.build}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Athletic"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="height"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Height
            </label>
            <input
              type="text"
              id="height"
              name="height"
              value={updateFormik.values.height}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="175 cm"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="eyeColor"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Eye Color
            </label>
            <input
              type="text"
              id="eyeColor"
              name="eyeColor"
              value={updateFormik.values.eyeColor}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Brown"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="skinTone"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Skin Tone
            </label>
            <input
              type="text"
              id="skinTone"
              name="skinTone"
              value={updateFormik.values.skinTone}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Fair"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="hairColor"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hair Color
            </label>
            <input
              type="text"
              id="hairColor"
              name="hairColor"
              value={updateFormik.values.hairColor}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Black"
              className={inputClassName}
              disabled={loading}
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="hairStyle"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Hair Style
            </label>
            <input
              type="text"
              id="hairStyle"
              name="hairStyle"
              value={updateFormik.values.hairStyle}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Short and wavy"
              className={inputClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="typicalAttire"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Typical Attire
            </label>
            <textarea
              rows={4}
              id="typicalAttire"
              name="typicalAttire"
              value={updateFormik.values.typicalAttire}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter typical attire..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="distinguishingFeatures"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Distinguishing Features
            </label>
            <textarea
              rows={4}
              id="distinguishingFeatures"
              name="distinguishingFeatures"
              value={updateFormik.values.distinguishingFeatures}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter distinguishing features..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="industryRelevance"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Industry Relevance
            </label>
            <textarea
              rows={4}
              id="industryRelevance"
              name="industryRelevance"
              value={updateFormik.values.industryRelevance}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter industry relevance..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="relevanceToScenario"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Relevance To Scenario
            </label>
            <textarea
              rows={4}
              id="relevanceToScenario"
              name="relevanceToScenario"
              value={updateFormik.values.relevanceToScenario}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter relevance to scenario..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="flex gap-x-4 w-full">
          <div className="w-full">
            <label
              htmlFor="challengesAndGrowthAreas"
              className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
            >
              Challenges and Growth Areas
            </label>
            <textarea
              rows={4}
              id="challengesAndGrowthAreas"
              name="challengesAndGrowthAreas"
              value={updateFormik.values.challengesAndGrowthAreas}
              onChange={updateFormik.handleChange}
              onBlur={updateFormik.handleBlur}
              placeholder="Enter challenges and growth areas..."
              className={textareaClassName}
              disabled={loading}
            />
          </div>
        </div>
        <div className="dark:bg-[#88888850] bg-zinc-200 h-px w-full" />
      </div>

      {/* button  */}
      <div className="pt-2 flex gap-3 justify-end  dark:bg-zinc-900 border-t border-zinc-200">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-5 py-2.5 cursor-pointer bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 font-medium border border-gray-300 dark:border-zinc-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={disableButton}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            disableButton
              ? 'bg-purple-300 dark:bg-purple-900/40 text-white cursor-not-allowed opacity-60'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <AnimatedSpinner show={loading} />
          Save Changes
        </button>
      </div>
    </form>
  );
};
