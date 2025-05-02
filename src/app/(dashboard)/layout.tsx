import NavBar from "@/components/molecules/NavBar/NavBar";
import SideMenu from "@/components/molecules/SideMenu/SideMenu";
import React from "react";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen font-urbanist">
      <SideMenu />
      <section className="flex-1 lg:ml-64">
        <NavBar />
        <main className="px-3 xl:px-9 py-3 xl:py-6">{children}</main>
      </section>
    </div>
  );
};

export default layout;
