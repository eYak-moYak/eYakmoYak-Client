import React from "react";
import RegisterMediForm from "./components/RegisterEachMediForm";

type Props = {};

const RegisterEachMedi = (props: Props) => {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <div className="flex h-5/6 w-10/12 flex-col items-center justify-end gap-4 rounded-t-xl bg-mywhite pb-14">
        <h1 className="z-10 mb-4 mt-16 text-5xl">개별약 등록하기</h1>
        <main className="flex flex-col">
          <RegisterMediForm />
          <button className="h-9" type="button">
            등록하기
          </button>
        </main>
      </div>
    </div>
  );
};

export default RegisterEachMedi;
