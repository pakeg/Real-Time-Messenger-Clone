"use client";

import useConversation from "@/app/hooks/useConversation";
import { FullConversationType } from "@/app/types";
import clsx from "clsx";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { MdOutlineGroupAdd } from "react-icons/md";
import ConversationBox from "./ConversationBox";
import GroupChatModal from "./GroupChatModal";
import { User } from "@prisma/client";
import { useSession } from "next-auth/react";
import { pusherClient } from "@/app/libs/pusher";
import { find } from "lodash";

interface IConversationsListProps {
  initialItems: FullConversationType[];
  users: User[];
}

const ConversationsList: React.FC<IConversationsListProps> = ({
  initialItems,
  users,
}) => {
  const [items, setItems] = useState(initialItems);
  const session = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();
  const { conversationId, isOpen } = useConversation();

  const pusherKey = useMemo(() => {
    return session?.data?.user?.email;
  }, [session?.data?.user?.email]);

  useEffect(() => {
    if (!pusherKey) return;

    pusherClient.subscribe(pusherKey);

    const newHandler = (conversation: FullConversationType) => {
      setItems((prev) => {
        if (find(prev, { id: conversation.id })) return prev;

        return [conversation, ...prev];
      });
    };

    const updatewHandler = (conversation: FullConversationType) => {
      setItems((prevState) =>
        prevState.map((item) => {
          if (item.id === conversation.id) {
            return {
              ...item,
              messages: conversation.messages,
            };
          }
          return item;
        })
      );
    };

    const removeHandler = (conversation: FullConversationType) => {
      setItems((prevState) => {
        return [...prevState.filter((i) => i.id !== conversation.id)];
      });

      if (conversationId === conversation.id) router.push("/conversations");
    };

    pusherClient.bind("conversation:new", newHandler);
    pusherClient.bind("conversation:update", updatewHandler);
    pusherClient.bind("conversation:remove", removeHandler);

    return () => {
      pusherClient.unsubscribe(pusherKey);
      pusherClient.unbind("conversation:new", newHandler);
      pusherClient.unbind("conversation:update", updatewHandler);
      pusherClient.unbind("conversation:remove", removeHandler);
    };
  }, [pusherKey, conversationId, router]);

  return (
    <>
      <GroupChatModal
        users={users}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
      <aside
        className={clsx(
          `
    fixed inset-y-0 pb-20 lg:pb-0 lg:left-20 lg:w-80 lg:block
    overflow-y-auto border-r border-gray-200
  `,
          isOpen ? "hidden" : "block w-full left-0"
        )}
      >
        <div className="px-5">
          <div className="flex justify-between mb-4 pt-4">
            <div className="text-2xl font-bold text-neutral-800">Messages</div>
            <div
              onClick={() => setIsModalOpen(true)}
              className="rounded-full p-2 bg-gray-100 text-gray-600 cursor-pointer hover:opacity-75 transition"
            >
              <MdOutlineGroupAdd size={20} />
            </div>
          </div>
          {items.map((item) => {
            return (
              <ConversationBox
                key={item.id}
                data={item}
                selected={conversationId === item.id}
              />
            );
          })}
        </div>
      </aside>
    </>
  );
};

export default ConversationsList;
