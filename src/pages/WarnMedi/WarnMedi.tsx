import React from "react";
import TakeMediCard from "./components/TakeMediCard";
import WarnMediList from "./components/WarnMediList";

type Props = {};

const WarnMedi = (props: Props) => {
  return (
    <div className="flex items-end rounded-t-xl justify-center">
      <div className="flex w-10/12 flex-col justify-end rounded-t-xl pb-14">
        <main className="flex flex-col">
          <TakeMediCard />
          <WarnMediList />
        </main>
      </div>
    </div>
  );
};

export default WarnMedi;