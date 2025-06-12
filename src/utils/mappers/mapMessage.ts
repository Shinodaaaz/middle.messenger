import {IMessage} from "@/pages/chat/chat.ts";
import {Message} from "@/components";

export function mapMessages(messages: IMessage[]): Message[] {
  return messages.map((msg) =>
    new Message({
      messageText: msg.messageText,
      timestamp: msg.timestamp,
      incoming: msg.incoming,
      outgoing: msg.outgoing,
      unread: msg.unread,
    })
  );
}
