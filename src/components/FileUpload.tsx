'use client'
import React from 'react'
import {useDropzone} from 'react-dropzone'
import {Inbox} from 'lucide-react'


const FileUpload = () => {
  const {getRootProps, getInputProps} = useDropzone({
    accept : {"application/pdf": [".pdf"]},
    onDrop: (acceptedFiles) => {
      console.log(acceptedFiles)
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