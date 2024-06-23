import { useRef } from "react";
import RegisterMediForm from "./components/RegisterEachMediForm";
import BodyLayout from "../../components/Common/BodyLayout";

type Props = {};

const RegisterEachMedi = (props: Props) => {
  const formRef = useRef<HTMLFormElement | null>(null);

  const handleRegisterClick = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true }),
      );
      alert("개별 약이 성공적으로 등록되었습니다.");
    }
  };

  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <h1 className="z-10 mb-4 mt-16 text-5xl">개별 약 등록하기</h1>
        <main className="flex flex-col">
          <RegisterMediForm ref={formRef} />
          <button className="h-9" type="button" onClick={handleRegisterClick}>
            등록하기
          </button>
        </main>
      </BodyLayout>
    </div>
  );
};

export default RegisterEachMedi;
