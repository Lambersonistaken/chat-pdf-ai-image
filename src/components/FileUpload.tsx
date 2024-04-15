'use client'
import React from 'react'
import {useDropzone} from 'react-dropzone'
import {Inbox} from 'lucide-react'
import { uploadToS3 } from '@/lib/s3'


const FileUpload = () => {
  const {getRootProps, getInputProps} = useDropzone({
    accept : {"application/pdf": [".pdf"]},
    onDrop: async (acceptedFiles) => {
      console.log(acceptedFiles)
      const file = acceptedFiles[0]
      if (file.size > 10 * 1024 * 1024) {
        // 10 mb dan büyükse
        alert('please upload a smaller file')
        return
      }
      try {
        const data = await uploadToS3(file)
        console.log('data',data)
      } catch (error) {
        console.log(error);
        
      }
    },
  });
  return (
    <div className='p-2 bg-white rounded-xl'>
        <div {...getRootProps({})} className='border-dashed border-2 rounded-xl cursor-pointer bg-gray-50 py-8 flex justify-center items-center'>
          <input {...getInputProps()} />
          <>
          <Inbox className='w-10 h-10 text-blue-500'/>
          <p className='mt-2 ml-2 text-sm text-slate-400'>Drag and drop some files here, or click to select files</p>
          </>
         
          </div>
    </div>
  )
}

export default FileUpload