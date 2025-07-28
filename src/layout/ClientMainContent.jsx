import React from "react";
import Header from "./header";
import Footer from "./footer";

const ClientMainContent = ({ children }) => {
  
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
};

export default ClientMainContent;
