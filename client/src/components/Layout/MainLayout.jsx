import React from "react";
import NavBar from "./NavBar";
import SideBar from "./SideBar";
import GroupManagement from "../Group/GroupManagement";  // Default main content

const MainLayout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ display: "flex" }}>
        <SideBar />
        <main style={{ flexGrow: 1 }}>
          <GroupManagement />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
