const ChatInput = () => {
  return (
    <div className="bg-gray-200 px-4 py-2 flex items-center rounded-full">
      <button className="text-gray-600">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
      </button>
      <input
        type="text"
        placeholder="Type a message..."
        className="bg-transparent outline-none p-2 flex-grow"
      />
      <button className="text-green-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 14l-3 6v2h7v-2l-3-6 3-6v-2H0v2l3 6z"
          />
        </svg>
      </button>
    </div>
  );
};

export default ChatInput;
