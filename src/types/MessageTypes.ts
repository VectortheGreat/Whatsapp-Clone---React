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
  receiver: string;
};

export type MessageSliceStateSelector = {
  messageStore: {
    messages?: string[];
    chatMode?: boolean;
    receiver?: string;
  };
};
