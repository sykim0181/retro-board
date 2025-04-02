import { BrowserRouter, Route, Routes } from "react-router";
import "./App.css";
import Home from "./pages/Home";
import BoardPage from "./pages/Board";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="board" element={<BoardPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
