export type Message = {
  id: number;
  content: string;
  date: string;
  hour: string;
};

export type MessageData = {
  messages: Message[];
  chatMode: boolean;
};

export type MessageStateSelector = {
  messageStore: {
    messages: string[];
  };
};

export type openChatStateSelector = {
  messageStore: {
    chatMode: boolean;
  };
};
