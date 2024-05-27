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
      <button
        className="border-myblue-500 absolute right-28 top-4 z-50 h-8 w-16 border-2"
        type="button"
        onClick={() => setSelectedDrug}
      >
        검색
      </button>
    </div>
  );
};

export default HeaderSearchMedi;
