import React from "react";
import SideBar from "./SideBar";
import GroupManagement from "../Group/GroupManagement"; // Default main content

const MainLayout = () => {
  return (
    <div className="container mx-auto px-4 flex flex-row">
      <aside>
        <SideBar />
      </aside>
      <main>
        <GroupManagement />
      </main>
    </div>
  );
};

export default MainLayout;
