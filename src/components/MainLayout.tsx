import { Outlet } from "react-router-dom";
import { SiteFooter } from "./SiteFooter";
import { StickyNav } from "./StickyNav";

export function MainLayout() {
  return (
    <div className="min-h-screen grid-bg">
      <StickyNav />
      <Outlet />
      <SiteFooter />
    </div>
  );
}
