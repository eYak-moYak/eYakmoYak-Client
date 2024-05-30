import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import headerIcon from "../../assets/header";

interface HeaderProps {
  title: string; // 타이틀을 위한 props
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("refresh");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="mb-20 w-full bg-myblue">
      <div className="flex justify-between p-3">
        <div className="flex items-center">
          <img src={headerIcon.logo} alt="이약머약 로고" />

          <h1 className="text-3xl">{title}</h1>
        </div>
        <div className="flex items-center justify-center">
          <img src={headerIcon.login} alt="이약머약 로고" />

          <Link to="/" onClick={handleAuthClick}>
            {isLoggedIn ? "로그아웃" : "로그인 해주세요"}
          </Link>
        </div>
      </div>
      <nav className="flex h-16 items-center justify-center bg-myblue">
        <ul className="mt-2 flex gap-14 rounded-t-xl bg-mywhite p-3 px-40">
          <li>
            <Link
              to="/upLoad"
              className="flex items-center justify-center gap-2"
            >
              <img src={headerIcon.photoUpload} alt="사진업로드 아이콘" />
              사진업로드
            </Link>
          </li>
          <li>
            <Link
              to="/register-eachmedi"
              className="flex items-center justify-center gap-2"
            >
              <img src={headerIcon.register} alt="약 등록 아이콘" />
              약정보 등록
            </Link>
          </li>

          <li>
            <Link
              to="/mediinfo"
              className="flex items-center justify-center gap-2"
            >
              <img src={headerIcon.info} alt="복약정보 아이콘" />
              복약정보
            </Link>
          </li>
          <li>
            <Link
              to="/warnmedi"
              className="flex items-center justify-center gap-2"
            >
              <img src={headerIcon.search} alt="병용금기약품 아이콘" />
              병용금기약품
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default Header;
