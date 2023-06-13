"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullMessageType } from "@/app/types";
import { useEffect, useRef, useState } from "react";
import MessageBox from "./MessageBox";
import axios from "axios";

interface IBodyIdComponentProps {
  initialMessages: FullMessageType[];
}

const BodyIdComponent: React.FC<IBodyIdComponentProps> = ({
  initialMessages,
}) => {
  const [messages, setMessages] = useState(initialMessages);
  const bottomRef = useRef<HTMLDivElement>(null);

  const { conversationId } = useConversation();

  useEffect(() => {
    axios.post("/api/conversations/" + conversationId + "/seen");
  }, [conversationId]);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message, i) => {
        return (
          <MessageBox
            isLast={i === messages.length - 1}
            key={message.id}
            data={message}
          />
        );
      })}
      <div className="pt-24" ref={bottomRef}></div>
    </div>
  );
};

export default BodyIdComponent;
