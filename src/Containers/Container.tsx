import React, { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
};

const Container: React.FC<ContainerProps> = ({ children }) => {
  return (
    <div className="container">
      <div className="flex justify-center">
        <div className="w-10/12 mt-3">{children}</div>
      </div>
    </div>
  );
};

export default Container;
