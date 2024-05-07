import React from "react";
import RegisterDoctor from "./components/RegisterDoctor";
import RegisterMedi from "./components/RegisterMedi";

function RegisterDoctorMedi() {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <div className="flex h-5/6 w-10/12 flex-col items-center justify-end gap-4 rounded-t-xl bg-mywhite pb-14">
        <h1 className="z-10 mb-4 mt-10 text-5xl">처방약 등록하기</h1>
        <main className="flex flex-col">
          <RegisterDoctor />
          <RegisterMedi />
          <button className="h-9" type="button">
            등록하기
          </button>
        </main>
      </div>
    </div>
  );
}

export default RegisterDoctorMedi;
