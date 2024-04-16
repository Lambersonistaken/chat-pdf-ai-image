'use client'
import React from 'react'
import {useDropzone} from 'react-dropzone'
import {Inbox, Loader2} from 'lucide-react'
import { uploadToS3 } from '@/lib/s3'
import { useMutation } from '@tanstack/react-query'
import axios from 'axios'
import toast from 'react-hot-toast'


const FileUpload = () => {
  const [upLoading, setUpLoading] = React.useState(false)
  const { mutate,isLoading } = useMutation({
      mutationFn: async({
        file_key,
        file_name,
      }:{
        file_key: String;
         file_name:String;
        }) => {
        const response = await axios.post('/api/create-chat', {
          file_key,
          file_name,
        });
        return response.data;
      }
  })
  const {getRootProps, getInputProps} = useDropzone({
    accept : {"application/pdf": [".pdf"]},
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles)
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        // 10 mb dan büyükse
        toast.error("file too large");
        return
      }
      try {
        setUpLoading(true)
        const data = await uploadToS3(file);
        if(!data?.file_key || !data.file_name) {
          toast.error('Something went wrong')
          return;
        }
        mutate(data, {
          onSuccess: (data) => {
            console.log (data);
           // toast.success(data.message);
          },
          onError: (err) => {
            toast.error("Error creating chat");
          }
        })
        console.log('data',data)
      } catch (error) {
        console.log(error);
      }
      finally {
        setUpLoading(false)
      }
    },
  });
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({})} className='border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center'>
          <input {...getInputProps()} />
          {upLoading || isLoading ? ( 
            <>
            {/* loading state*/}
            <Loader2 className="h-10 w-10 text-blue-500 animate-spin"/>
            <p className="mt-2 text-sm text-slate-400">
              Spilling Tea to GPT...
            </p>
            </>

            ): (
          <>
          <Inbox className='w-10 h-10 text-blue-500'/>
          <p className='mt-2 ml-2 text-sm text-slate-400'>Drag and drop some files here, or click to select files</p>
          </>
         )}
          </div>
    </div>
  );
};

export default FileUpload