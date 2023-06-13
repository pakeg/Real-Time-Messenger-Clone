import getConversationById from "@/app/actions/getConversationById";
import getMessages from "@/app/actions/getMessages";
import EmptyState from "@/app/components/EmptyState";
import HeaderIdComponent from "./components/HeaderIdComponent";
import BodyIdComponent from "./components/BodyIdComponent";
import FormIdComponent from "./components/FormIdComponent";

interface IConversationIdProps {
  conversationId: string;
}
const ConversationId = async ({ params }: { params: IConversationIdProps }) => {
  const conversation = await getConversationById(params.conversationId);
  const messages = await getMessages(params.conversationId);

  if (!conversation) {
    return (
      <div className="lg:pl-80 h-screen">
        <div className="h-full flex flex-col">
          <EmptyState />
        </div>
      </div>
    );
  }

  return (
    <div className="lg:pl-80 h-screen">
      <div className="h-full flex flex-col">
        <HeaderIdComponent conversation={conversation} />
        <BodyIdComponent initialMessages={messages} />
        <FormIdComponent />
      </div>
    </div>
  );
};

export default ConversationId;
