import RegisterDoctor from "./components/RegisterDoctorForm";
import RegisterMedi from "./components/RegisterDoctorMediForm";
import BodyLayout from "../../components/Common/BodyLayout";

function RegisterDoctorMedi() {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <h1 className="z-10 mb-4 mt-10 text-5xl">처방약 등록하기</h1>
        <main className="flex flex-col">
          <RegisterDoctor />
          <RegisterMedi />
          <button className="h-9" type="button">
            등록하기
          </button>
        </main>
      </BodyLayout>
    </div>
  );
}

export default RegisterDoctorMedi;
