import BodyLayout from "../../components/Common/BodyLayout";
import KaKaoLoginForm from "./components/KaKaoLoginForm";

const Login = () => {
  return (
    <div className="flex h-5/6 items-end justify-center">
      <BodyLayout>
        <div>
          <h1 className="z-10 pt-10 text-7xl">이약머약</h1>
        </div>
        <p className="flex pb-36 text-center text-neutral-400">
          약봉투 사진을 업로드하고
          <br /> 복약정보부터 병용금기 약물 조회까지 <br />
          쉽게 이용하세요!
          <br />
          지금, 나만의 약사를 만나보세요!
        </p>
        <KaKaoLoginForm />
      </BodyLayout>
    </div>
  );
};

export default Login;
