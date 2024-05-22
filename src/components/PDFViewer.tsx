"use client"
import React from "react";
import { EmbedPDF } from "@simplepdf/react-embed-pdf";

type Props = { pdf_url: string,
  pdf_name: string
 };

const PDFViewer = ({ pdf_url, pdf_name }: Props) => {
  return (
    <>
    
    <EmbedPDF
  mode="inline"
  style={{ width: 900, height: 800 }}
  documentURL={pdf_url}
/>
    
    </>
   
    
    

  );
};

export default PDFViewer;