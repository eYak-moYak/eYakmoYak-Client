import { ReactComponent as KaKaoLogin } from "../../../assets/login/kakaoLogin.svg";

// 카카오 로그인 버튼 누르면 카카오 로그인 페이지로 리다이렉트
const onKakaoLogin = () => {
  window.location.href = `${process.env.REACT_APP_API_URL}/oauth2/authorization/kakao
  `;
};

const KaKaoLoginForm = () => {
  return (
    <>
      <button onClick={onKakaoLogin} type="button">
        <KaKaoLogin />
      </button>
    </>
  );
};

export default KaKaoLoginForm;
