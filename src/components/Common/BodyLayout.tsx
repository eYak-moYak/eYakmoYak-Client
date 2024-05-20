import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const BodyLayout: React.FC<Props> = ({ children }) => {
  return (
    <div className="flex h-5/6 w-10/12 flex-col items-center justify-end gap-4 rounded-t-xl bg-mywhite pb-14">
      {children}
    </div>
  );
};
export default BodyLayout;
