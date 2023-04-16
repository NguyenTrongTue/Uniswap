import { useSelector } from "react-redux";
import RoutesApp from "./routes";
import { BrowserRouter } from "react-router-dom";

function App() {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="App">
      <BrowserRouter>
        <RoutesApp currentUser={currentUser} />
      </BrowserRouter>
    </div>
  );
}

export default App;
