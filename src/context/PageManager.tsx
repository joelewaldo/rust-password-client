import React, { createContext, useContext, useState, ReactNode } from "react";

type PageManagerContextType = {
  currentPage: string;
  switchPage: (page: string) => void;
};

const PageManagerContext = createContext<PageManagerContextType | undefined>(
  undefined
);

export const usePageManager = () => {
  const context = useContext(PageManagerContext);
  if (!context) {
    throw new Error("usePageManager must be used within a PageManagerProvider");
  }
  return context;
};

type PageManagerProviderProps = {
  children: ReactNode;
};

export const PageManagerProvider: React.FC<PageManagerProviderProps> = ({
  children,
}) => {
  const [currentPage, setCurrentPage] = useState<string>("password");

  const switchPage = (page: string) => {
    setCurrentPage(page);
  };

  return (
    <PageManagerContext.Provider value={{ currentPage, switchPage }}>
      {children}
    </PageManagerContext.Provider>
  );
};
