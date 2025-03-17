import { FC, ReactNode } from "react";
import Header from "../Header";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout: FC<DefaultLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      
    </>
  );
};

export default DefaultLayout;
