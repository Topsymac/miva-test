"use client";
import React from "react";
import Image from "next/image";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex items-center h-screen   lg:gap-x-11 bg-primary">
      <div className="w-full lg:w-6/12 flex justify-center">{children}</div>
      <section className="w-6/12 h-full lg:block hidden bg-white relative">
        <Image
          src="/images/bg-img.jpg"
          alt="auth_layout_image"
          className="w-full h-full object-cover"
          fill
        />
      </section>
    </div>
  );
};

export default Layout;
