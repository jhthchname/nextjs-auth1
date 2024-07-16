import React from "react";
import Navbar from "./Navbar";

function LayoutContainer({ children, user }) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar user={user} />
      {children}
    </div>
  );
}

export default LayoutContainer;
