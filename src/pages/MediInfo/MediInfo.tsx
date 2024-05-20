import React from "react";
import BodyLayout from "../../components/Common/BodyLayout";
import MediCard from "./components/MediCard";

type Props = {};

const MediInfo: React.FC<Props> = () => {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <div className="flex flex-wrap gap-4">
          <MediCard />
          <MediCard />
          <MediCard />
          <MediCard />
          <MediCard />
        </div>
      </BodyLayout>
    </div>
  );
};

export default MediInfo;
