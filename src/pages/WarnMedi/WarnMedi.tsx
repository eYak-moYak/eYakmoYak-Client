import React from "react";
import TakeMediCard from "./components/TakeMediCard";
import WarnMediList from "./components/WarnMediList";

type Props = {};

const WarnMedi = (props: Props) => {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <div className="flex h-5/6 w-10/12 flex-col justify-end gap-4 rounded-t-xl bg-mywhite pb-14">
        <h1 className="ml-5 mt-5 text-2xl">복용 중인 약</h1>
        <main className="flex flex-col">
          <TakeMediCard />
          <WarnMediList />
        </main>
      </div>
    </div>
  );
};

export default WarnMedi;