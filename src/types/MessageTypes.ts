export type Message = {
  id: number;
  content: string;
  date: string;
  hour: string;
};

export type MessageData = {
  messages: Message[];
};

export type MessageStateSelector = {
  messageStore: {
    messages: string[];
  };
};
