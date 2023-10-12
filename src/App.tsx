import Container from "./Containers/Container";
import Home from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="bg-gray-800 text-white max-h-screen box-border">
      <Container>
        <Home></Home>
        <ToastContainer autoClose={3000} />
      </Container>
    </div>
  );
}

export default App;
