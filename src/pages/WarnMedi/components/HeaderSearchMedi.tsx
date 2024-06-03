import React from "react";
import HeaderAutoMediInput from "./HeaderAutoMediInput";
import { Drug } from "./HeaderAutoMediInput";

type Props = {
  setSelectedDrug: (drug: Drug) => void;
};

const HeaderSearchMedi: React.FC<Props> = ({ setSelectedDrug }) => {
  return (
    <div className="relative bottom-56 right-7">
      <HeaderAutoMediInput setSelectedDrug={setSelectedDrug} />
    </div>
  );
};

export default HeaderSearchMedi;
