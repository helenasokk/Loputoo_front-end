import ReactDOM from "react-dom/client";
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
// Tegin eraldi pages alamkausta lehtede jaoks
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Mang1 from "./pages/App";
import Mang2 from "./pages/App2";
import Mang3 from "./pages/App3";

// Selleks, et lehtede ruutimine toimuks korrektselt
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/mang1" element={<Mang1 />} />
          <Route path="/mang2" element={<Mang2 />} />
          <Route path="/mang3" element={<Mang3 />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
