export type Message = {
  id: number;
  content: string;
  date: string;
  hour: string;
};

export type MessageData = {
  messages: Message[];
  chatMode: boolean;
  chatID: string;
  chatKey: string;
  receiver: string;
};

export type MessageSliceStateSelector = {
  messageStore: {
    messages?: string[];
    chatMode?: boolean;
    receiver?: string;
    chatID?: string;
    chatKey?: string;
  };
};
