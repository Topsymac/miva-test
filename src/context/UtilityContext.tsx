'use client'

import React, {
  useState,
  useContext,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";

interface Utility {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
}

interface Children {
  children: React.ReactNode;
}

const UtilContext = React.createContext<Utility>({
  open: true,
  setOpen: () => {},
});

export function useUtilAuth() {
  return useContext(UtilContext);
}

export const UtilProvider = ({ children }: Children) => {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);
  const value = {
    open,
    setOpen,
  };
  return <UtilContext.Provider value={value}>{children}</UtilContext.Provider>;
};
