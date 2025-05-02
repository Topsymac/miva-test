"use client";
import { ReactNode, useEffect } from "react";

interface Props {
  children: ReactNode;
  open: boolean;
  setOpen: () => void;
}

const Modal = ({ children, open, setOpen }: Props) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  return (
    <div
      className={`fixed left-0 right-0 top-0 z-40 flex h-screen max-xl:h-screen max-xl:pt-16 items-center justify-center ${
        open ? "" : "hidden"
      }`}
    >
      <div
        className={`transition3 fixed bottom-0 left-0 right-0 top-0 bg-[#00000066] ${
          open
            ? "max-xl:bg-light visible backdrop-blur-[2px]"
            : "invisible backdrop-blur-none"
        }`}
        onClick={setOpen}
      />
      {children}
    </div>
  );
};

export default Modal;
