import React, { useState } from "react";
import TakeMediCard from "./components/TakeMediCard";
import WarnMediList from "./components/WarnMediList";
import HeaderSearchMedi from "./components/HeaderSearchMedi";
import { Drug } from "./components/HeaderAutoMediInput";

type WarningData = {
  name: string;
  reason: string;
};

const WarnMedi: React.FC = () => {
  const [warningData, setWarningData] = useState<WarningData[]>([]);
  const [selectedDrug, setSelectedDrug] = useState<Drug | null>(null);

  return (
    <div className="flex items-end justify-center rounded-t-xl">
      <div className="flex w-10/12 flex-col justify-end rounded-t-xl pb-14">
        <main className="flex flex-col">
          <HeaderSearchMedi setSelectedDrug={setSelectedDrug} />
          <TakeMediCard
            selectedDrug={selectedDrug}
            setWarningData={setWarningData}
          />
          <WarnMediList warningData={warningData} />
        </main>
      </div>
    </div>
  );
};

export default WarnMedi;
