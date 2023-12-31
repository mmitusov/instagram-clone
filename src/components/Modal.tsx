import { modalState } from '@/store/modalAtom';
import React, { Fragment, useRef, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Transition, Dialog } from '@headlessui/react';
import { CameraIcon } from '@heroicons/react/24/outline';
import { useSession } from 'next-auth/react';
import { postCreate } from '@/http/postCreate';

const Modal = () => {
  const { data: session } = useSession()
  const [isModalOpen, setIsModalOpen] = useRecoilState(modalState);
  const [selectegImg, setSelectegImg] = useState<any>('')
  const [loading, setLoading] = useState<boolean>(false)
  const filePickerRef = useRef<HTMLInputElement | null>(null);
  const captionRef = useRef(null);
   
  const uploadPost = async () => {
    if (loading) return;
    setLoading(true)

    await postCreate({ session, captionRef, selectegImg })

    setIsModalOpen(false)
    setLoading(false)
    setSelectegImg('')
  }
  
  const addImageToPost = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0])
    reader.onload = (readerEvent) => {
      setSelectegImg(readerEvent?.target?.result)
    }
  }

  return (
    <Transition.Root show={isModalOpen} as={Fragment }>
      <Dialog
        as='div'
        className='fixed z-10 inset-0 overflow-y-auto'
        onClose={() => setIsModalOpen(false) as any}
      >
        <div className='flex items-end justify-center min-h-[800px] sm:min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0'>
          {/* Overlay */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>

          {/* Modal's Content */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <div className="
              inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden
              shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6
            ">
              <div>
                {
                  selectegImg 
                    ?
                      <img 
                        src={selectegImg} 
                        alt='imgToUpload' 
                        onClick={() => setSelectegImg('')}
                        className='w-full object-contain cursor-pointer'
                      />
                    :
                      <div
                        onClick={() => {filePickerRef?.current?.click()}}
                        className='mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 cursor-pointer'
                      >
                        <CameraIcon 
                          className='w-6 h-6 text-red-600'
                          aria-hidden='true'
                        />
                      </div>
                }
                <input
                  ref={filePickerRef}
                  onChange={addImageToPost}
                  type="file"
                  hidden
                />

                <div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-lg leading-6 font-medium text-gray-900'
                    >
                      Upload a photo
                    </Dialog.Title>
                    <div>
                      <input
                        className='border-none focus:ring-0 w-full text-center'
                        ref={captionRef}
                        type="text"
                        placeholder='Please enter a caption...'
                      />
                    </div>
                  </div>
                </div>

                <div className='mt-5 sm:mt-6'>
                  <button
                    type='button'
                    disabled={!selectegImg}
                    onClick={uploadPost}
                    className='
                      inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4
                      py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none
                      focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:text-sm disabled:bg-gray-300
                      disabled:cursor-not-allowed hover:disabled:bg-gray-300"
                    '
                  >
                    {loading ? 'Uploading...' : 'Upload Post'}
                  </button>
                </div>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

export default Modal