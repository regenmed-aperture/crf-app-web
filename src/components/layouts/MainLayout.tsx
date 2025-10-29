import type React from "react";
import { Outlet } from "react-router-dom";

export const MainLayout: React.FC = () => {
  return (
    <div className="w-full h-full bg-muted/50 overflow-hidden">
      <Outlet />
    </div>
  )
}
