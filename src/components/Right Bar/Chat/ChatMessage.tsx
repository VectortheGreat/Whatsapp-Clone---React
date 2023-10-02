const ChatMessage = ({ msg }) => {
  return (
    <div className="mt-4 flex justify-end">
      <span className="bg-slate-200 text-black p-2 rounded-md">{msg}</span>
    </div>
  );
};

export default ChatMessage;
