import { FormikProps } from 'formik';
import { CreateFormValues } from '../../../formik/interface';
import { AnimatedDropdown } from '../AnimatedDropdown';
import { AnimatedSpinner } from '../AnimatedSpinner';
import { UploadFileForm } from './UploadFileForm';
import { AnimatedModal } from '../AnimatedModal';
import { useState } from 'react';
import Cookies from 'js-cookie';
import useSWR from 'swr';
import { fetcherBackend } from '../../../utils/api';
import { FileResponse } from '../../../interface';
import { Cross2Icon } from '@radix-ui/react-icons';

interface CreatePersonaForm {
  loading: boolean;
  createFormik: FormikProps<CreateFormValues>;
  setIsOpen: (value: boolean) => void;
  uploading: boolean;
  setUploading: (value: boolean) => void;
}

export const CreatePersonaForm = ({
  loading,
  createFormik,
  setIsOpen,
  uploading,
  setUploading,
}: CreatePersonaForm) => {
  const email = Cookies.get('email');
  const [animatedModalOpen, setAnimatedModalOpen] = useState(false);

  const { data: totalFilesData, mutate: filesMutate } = useSWR(
    `/files/all/${email}`,
    fetcherBackend,
  );

  const totalFilesResult = totalFilesData?.data?.files;
  const disableSubmitButton = !createFormik.isValid || loading;
  return (
    <form
      onSubmit={createFormik.handleSubmit}
      className="bg-white dark:bg-zinc-900 rounded-2xl p-8 shadow-2xl max-w-3xl mx-auto"
    >
      <h2 className="text-2xl font-bold flex items-center gap-2 text-gray-900 dark:text-white mb-6">
        ⚡ Create New Persona
      </h2>

      {/* Add Source File */}
      <div className="mb-6">
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
                totalFilesResult?.find((x: FileResponse) => x.file_id === e.id),
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
                              (x: FileResponse) => x.file_id !== val.file_id,
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

      {/* Name Input */}
      <div className="mb-6">
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Name <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onBlur={createFormik.handleBlur}
          value={createFormik.values.name}
          onChange={createFormik.handleChange}
          placeholder="Enter persona name"
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            loading
              ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
              : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
          }`}
          disabled={loading}
        />
      </div>

      {/* Persona Prompt */}
      <div className="mb-6">
        <label
          htmlFor="personaPrompt"
          className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-300"
        >
          Persona Prompt <span className="text-red-500">*</span>
        </label>
        <textarea
          id="personaPrompt"
          name="personaPrompt"
          value={createFormik.values.personaPrompt}
          onChange={createFormik.handleChange}
          onBlur={createFormik.handleBlur}
          placeholder="Make a personalized description of the persona"
          className={`w-full border rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 dark:focus:ring-purple-400 transition-all resize-none placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
            loading
              ? 'bg-gray-100 dark:bg-zinc-800 border-gray-200 dark:border-zinc-700 cursor-not-allowed text-gray-500 dark:text-gray-500'
              : 'bg-white dark:bg-zinc-800 border-gray-300 dark:border-zinc-600 text-gray-900 dark:text-white'
          }`}
          rows={4}
          disabled={loading}
        />
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-3 pt-2">
        <button
          type="button"
          onClick={() => setIsOpen(false)}
          className="px-5 py-2.5 cursor-pointer bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-zinc-700 transition-all duration-200 font-medium border border-gray-300 dark:border-zinc-600"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={disableSubmitButton}
          className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-2 ${
            disableSubmitButton
              ? 'bg-purple-300 dark:bg-purple-900/40 text-white cursor-not-allowed opacity-60'
              : 'bg-purple-600 hover:bg-purple-700 text-white shadow-md hover:shadow-lg'
          }`}
        >
          <AnimatedSpinner show={loading} />
          {loading ? 'Creating...' : 'Create Persona'}
        </button>
      </div>

      <AnimatedModal
        widthFitContainer
        isOpen={animatedModalOpen}
        onClose={() => {
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
    </form>
  );
};
