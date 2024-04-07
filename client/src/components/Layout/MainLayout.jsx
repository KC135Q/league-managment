import React from "react";
import SideBar from "./SideBar";
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4 flex flex-row">
      <aside>
        <SideBar />
      </aside>
      <Outlet />
    </div>
  );
};

export default MainLayout;
