import { jsx as _jsx } from "react/jsx-runtime";
const Container = ({ children }) => {
    return (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "w-11/12 mt-3", children: children }) }));
};
export default Container;
