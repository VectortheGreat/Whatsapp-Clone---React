import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Container from "./Containers/Container";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
    return (_jsx("div", { className: "bg-slate-800 text-white max-h-screen box-border", children: _jsxs(Container, { children: [_jsx(Home, {}), _jsx(ToastContainer, { autoClose: 3000 })] }) }));
}
export default App;
