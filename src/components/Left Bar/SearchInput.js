import { jsx as _jsx } from "react/jsx-runtime";
const SearchInput = () => {
    return (_jsx("div", { className: "p-2 border-b-2", children: _jsx("input", { type: "text", placeholder: "Search...", className: "w-full border rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-300" }) }));
};
export default SearchInput;
