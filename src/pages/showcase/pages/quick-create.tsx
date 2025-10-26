'use client';

import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowcaseLayout from '../ShowcaseLayout';
import { ArrowLeft, Zap } from 'lucide-react';
import {
  FileResponse,
  JobResponse,
  RoleplayJobResponse,
} from '../../../interface';
import {
  AnimatedDropdown,
  AnimatedModal,
  AnimatedSpinner,
  UploadFileForm,
  ModalProgress,
} from '../../../components/ui';
import useSWR from 'swr';
import { axiosBackend, fetcherBackend } from '../../../utils/api';
import { useFormik } from 'formik';
import {
  createQuickScenarioInitialValues,
  createQuickScenarioSchema,
  CreateQuickScenarioValues,
  QuickScenarioValues,
} from '../../../formik';
import { JobStatus, scenarioPresets } from '../../../utils/helper';
import { Cross2Icon } from '@radix-ui/react-icons';
import { toast } from 'sonner';
import Cookies from 'js-cookie';

export default function ShowcaseQuickCreatePage() {
  const email = Cookies.get('email');
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [animatedModalOpen, setAnimatedModalOpen] = useState(false);
  const [showLoadingProgress, setShowLoadingProgress] = useState(false);
  const [chosenScenarioPreset, setChosenScenarioPreset] = useState<
    string | null
  >(null);
  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/files/all/${email}`,
    fetcherBackend,
  );

  const totalFilesResult = totalFilesData?.data?.files;

  const navigate = useNavigate();

  const createFormik = useFormik<CreateQuickScenarioValues>({
    initialValues: createQuickScenarioInitialValues,
    validationSchema: createQuickScenarioSchema,
    onSubmit: async (values) => {
      try {
        setLoading(true);
        const fileIdsTemp = values.files.map((x: FileResponse) => x.file_id);
        const response = await axiosBackend.post('/quick-roleplay/create', {
          scenario_title: values.scenario_title,
          ai_role: values.ai_role,
          my_role: values.my_role,
          scenario_description: values.scenario_description,
          organization_id: email,
          file_ids: fileIdsTemp,
        });
        setShowLoadingProgress(true);
        setLoading(false);
        const jobResponse = response.data as JobResponse;
        const createQuickRoleplayInterval = setInterval(async () => {
          const roleplayStatus = await axiosBackend.get(
            `/quick-roleplay/job-status-create/${jobResponse.jobId}`,
          );
          const roleplayResult = roleplayStatus.data as RoleplayJobResponse;
          if (roleplayResult.jobStatus === JobStatus.Completed) {
            toast.success('Roleplay created successfully!', {
              id: 'roleplay-created',
              duration: 4000,
            });
            setLoading(false);
            clearInterval(createQuickRoleplayInterval);
          } else if (roleplayResult.jobStatus === JobStatus.Failed) {
            setLoading(false);
            toast.error('Roleplay failed to be created. Please try again.', {
              id: 'roleplay-created-error',
              duration: 4000,
            });
            clearInterval(createQuickRoleplayInterval);
          }
        }, 5000);
      } catch (e) {
        toast.error(e?.toString(), {
          duration: 4000,
        });
        setLoading(false);
        console.log(e);
      }
    },
  });

  const handleSelectPreset = async (e: QuickScenarioValues) => {
    setChosenScenarioPreset(e.title);
    await createFormik.setFieldValue('my_role', e.my_role);
    await createFormik.setFieldValue('ai_role', e.ai_role);
    await createFormik.setFieldValue(
      'scenario_description',
      e.scenario_description,
    );
    await createFormik.setFieldValue('scenario_title', e.title);
    await createFormik.validateForm();
  };

  const handleResetPreset = async () => {
    createFormik.resetForm();
    setChosenScenarioPreset('');
    await createFormik.validateForm();
  };

  useEffect(() => {
    (async () => {
      await createFormik.validateForm();
    })();
  }, []);

  return (
    <>
      <ShowcaseLayout>
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-3 mb-8">
            <button
              onClick={() => navigate('/showcase')}
              type="button"
              className="cursor-pointer inline-flex items-center justify-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Quick Create Scenario
              </h2>
            </div>
          </div>

          {/* Form */}
          <form className="space-y-6" onSubmit={createFormik.handleSubmit}>
            {/* Scenario Title */}
            <div>
              <label
                htmlFor="scenario_title"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Scenario Title <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="scenario_title"
                name="scenario_title"
                value={createFormik.values.scenario_title}
                onChange={createFormik.handleChange}
                placeholder="Enter scenario title"
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  loading
                    ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
                    : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
                }`}
                disabled={loading}
              />
            </div>

            {/* Scenario Preset */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                Scenario Preset (optional)
              </label>
              <AnimatedDropdown
                loading={loading}
                label={`${
                  chosenScenarioPreset === null || chosenScenarioPreset === ''
                    ? 'Select a preset to prefill fields...'
                    : chosenScenarioPreset
                }`}
                labelPlaceholder={
                  chosenScenarioPreset === null || chosenScenarioPreset === ''
                }
                isNested
                options={scenarioPresets}
                onReset={handleResetPreset}
                onSelect={async (e: QuickScenarioValues) =>
                  handleSelectPreset(e)
                }
                customClassName="w-[100%]"
              />
            </div>

            {/* Roles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="my_role"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  My Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="my_role"
                  name="my_role"
                  value={createFormik.values.my_role}
                  onChange={createFormik.handleChange}
                  placeholder="Enter your role (e.g., 'Sales')"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    loading
                      ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
                      : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
                  }`}
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor="ai_role"
                  className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  AI Role <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="ai_role"
                  name="ai_role"
                  value={createFormik.values.ai_role}
                  onChange={createFormik.handleChange}
                  placeholder="Enter AI's role (e.g., 'Customer')"
                  className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                    loading
                      ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
                      : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
                  }`}
                  disabled={loading}
                />
              </div>
            </div>

            {/* Add Source File */}
            <div>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Add Source File
                </label>
                <AnimatedDropdown
                  loading={loading}
                  label="Select file to add..."
                  options={totalFilesResult
                    ?.filter((x: FileResponse) => {
                      const currentIds = createFormik.values.files.map(
                        (x: FileResponse) => x.file_id,
                      );
                      return !currentIds.includes(x.file_id);
                    })
                    .map((result: FileResponse) => ({
                      name: result.filename,
                      id: result.file_id,
                    }))}
                  onSelect={(e) => {
                    createFormik.setFieldValue('files', [
                      ...createFormik.values.files,
                      totalFilesResult?.find(
                        (x: FileResponse) => x.file_id === e.id,
                      ),
                    ]);
                  }}
                  customClassName="w-full md:w-[60%]"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 items-center justify-end">
                <p className="italic text-sm text-gray-500 dark:text-gray-400">
                  Do you not have the file you need?
                </p>
                <button
                  disabled={loading}
                  type="button"
                  onClick={() => setAnimatedModalOpen(true)}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                >
                  Upload New File
                </button>
              </div>
              {createFormik?.values?.files &&
                createFormik?.values?.files?.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Selected files:
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {createFormik?.values?.files?.map(
                        (val: FileResponse, index) => (
                          <div
                            key={index}
                            className="flex items-center gap-2 bg-purple-50 dark:bg-purple-950/20 border border-purple-200 dark:border-purple-800 rounded-lg px-3 py-2 text-sm"
                          >
                            <p className="text-gray-700 dark:text-gray-300">
                              {val?.filename}
                            </p>
                            <button
                              type="button"
                              onClick={() => {
                                createFormik.setFieldValue(
                                  'files',
                                  createFormik.values.files.filter(
                                    (x: FileResponse) =>
                                      x.file_id !== val.file_id,
                                  ),
                                );
                              }}
                              className="cursor-pointer p-1 rounded-full hover:bg-purple-200 dark:hover:bg-purple-900 transition-colors"
                            >
                              <Cross2Icon className="w-3 h-3" />
                            </button>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
            </div>

            {/* Scenario Description */}
            <div>
              <label
                htmlFor="scenario_description"
                className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Scenario Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="scenario_description"
                name="scenario_description"
                value={createFormik.values.scenario_description}
                onChange={createFormik.handleChange}
                placeholder="Make a scenario based on the uploaded document on page 3"
                className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  loading
                    ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
                    : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
                }`}
                rows={6}
                disabled={loading}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                disabled={!createFormik.isValid || loading}
                className={`px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
                  !createFormik.isValid || loading
                    ? 'bg-purple-300 dark:bg-purple-900/40 text-white cursor-not-allowed opacity-60'
                    : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
                }`}
              >
                <AnimatedSpinner show={loading} />
                {loading ? 'Creating...' : 'Create Scenario'}
              </button>
            </div>
          </form>
        </div>
      </ShowcaseLayout>

      <AnimatedModal
        widthFitContainer
        isOpen={animatedModalOpen}
        onClose={() => {
          if (uploading) return;
          setAnimatedModalOpen(false);
        }}
      >
        <UploadFileForm
          setLoading={setUploading}
          setIsOpen={setAnimatedModalOpen}
          loading={uploading}
          filesMutate={filesMutate}
        />
      </AnimatedModal>
      <AnimatedModal
        widthFitContainer
        isOpen={showLoadingProgress}
        onClose={() => setShowLoadingProgress(false)}
      >
        <ModalProgress setShowLoadingModal={setShowLoadingProgress} />
      </AnimatedModal>
    </>
  );
}
