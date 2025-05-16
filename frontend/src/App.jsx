import { Routes, Route } from "react-router-dom";
import Calculator from "./pages/calculator";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Calculator />} />
    </Routes>
  );
}
