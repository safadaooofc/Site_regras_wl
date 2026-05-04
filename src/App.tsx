import { Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { Home } from "./pages/Home";
import { RulesPage } from "./pages/RulesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/regras" element={<RulesPage />} />
      </Route>
    </Routes>
  );
}
