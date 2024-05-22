import React from "react";


type Props = { pdf_url: string,
  pdf_name: string
 };

const PDFViewer = ({ pdf_url, pdf_name }: Props) => {
  return (
    <>
    <div>{pdf_name}</div>
     <iframe
      src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`}
      className="w-full h-full"
    ></iframe>
    
    </>
   
    
    

  );
};

export default PDFViewer;