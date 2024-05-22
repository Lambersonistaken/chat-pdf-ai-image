
import ChatComponent from "@/components/ChatComponent";
import ChatSidebar from "@/components/ChatSidebar";
import PDFViewer from "@/components/PDFViewer";
import { db } from "@/lib/db";
import { chats } from "@/lib/db/schema";
import { auth } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import React from "react";


type Props = {
    params:{
        chatId: string
    
    }
}

const  ChatPage = async ({params: {chatId}}: Props) => {
    const {userId} = await auth();
    if(!userId) {
      return redirect('/sign-in')
    }
    
    const _chats = await db.select().from(chats).where(eq(chats.userId, userId));
    if(!chats){
      return redirect('/')
    }
    if(!_chats.find((chat) => chat.id === parseInt(chatId))){
      return redirect('/')
    }


    const currentChat = _chats.find((chat) => chat.id === parseInt(chatId));


  return (
    <div className="flex max-h-screen overflow-hidden">
      <div className="flex w-full max-h-screen overflow-hidden">
        {/* Chat sidebar */}
        <div className="flex-[1] max-w-xs">
          <ChatSidebar chats={_chats} chatId={parseInt(chatId)} />  
        </div>
        {/* PDF Viewer */}
        <div className="max-h-screen p-4 overflow-hidden flex-[5]">
        <PDFViewer pdf_url={`https://tarikisobucket.s3.eu-north-1.amazonaws.com/${currentChat?.fileKey}` || ""} pdf_name={currentChat?.pdfName || ""} />
        </div>
        {/* Chat component */}
        <div className="flex-[3] border-1-4 border-1-slate-200">
          <ChatComponent />
        </div>
      </div>
    </div>
  )
}

export default ChatPage