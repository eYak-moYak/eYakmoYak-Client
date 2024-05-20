import RegisterMediForm from "./components/RegisterEachMediForm";
import BodyLayout from "../../components/Common/BodyLayout";

type Props = {};

const RegisterEachMedi = (props: Props) => {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <h1 className="z-10 mb-4 mt-16 text-5xl">개별약 등록하기</h1>
        <main className="flex flex-col">
          <RegisterMediForm />
          <button className="h-9" type="button">
            등록하기
          </button>
        </main>
      </BodyLayout>
    </div>
  );
};

export default RegisterEachMedi;
