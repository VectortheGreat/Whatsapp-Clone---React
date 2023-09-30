import Container from "./Containers/Container";
import Home from "./pages/Home";

function App() {
  return (
    <div className="bg-gray-800 text-white h-screen">
      <Container>
        <Home></Home>
      </Container>
    </div>
  );
}

export default App;
