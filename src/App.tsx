import { Navigate, Route, Routes } from "react-router-dom";
import { MainLayout } from "./components/MainLayout";
import { AdminPage } from "./pages/AdminPage";
import { EbRulesPage } from "./pages/EbRulesPage";
import { Home } from "./pages/Home";
import { RpRulesPage } from "./pages/RpRulesPage";

export default function App() {
  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/regras" element={<Navigate to="/regras/rp" replace />} />
        <Route path="/regras/rp" element={<RpRulesPage />} />
        <Route path="/regras/eb" element={<EbRulesPage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
    </Routes>
  );
}
