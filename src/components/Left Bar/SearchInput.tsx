const SearchInput = () => {
  return (
    <div className="p-2 border-b-2">
      <input
        type="text"
        placeholder="Search Users..."
        className="w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300"
        disabled
      />
    </div>
  );
};

export default SearchInput;
