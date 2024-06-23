import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import headerIcon from "../../assets/header";

interface HeaderProps {
  title: string;
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleAuthClick = () => {
    if (isLoggedIn) {
      // 로그아웃 클릭시 토큰 삭제 후 로그아웃
      localStorage.removeItem("access");
      setIsLoggedIn(false);
      navigate("/");
    } else {
      // 로그인 페이지로 이동
      navigate("/");
    }
  };

  const getLinkClass = (path: string) =>
    `flex items-center justify-center gap-2 ${
      location.pathname === path ? "text-mypurple" : ""
    }`;

  const getIcon = (path: string, defaultIcon: string, activeIcon: string) => {
    return location.pathname === path ? activeIcon : defaultIcon;
  };

  return (
    <div className="mb-20 w-full bg-myblue">
      <div className="flex justify-between bg-myblue p-3">
        <div className="flex items-center">
          <img src={headerIcon.logo} alt="이약머약 로고" className="mr-2" />
          <h1 className="text-3xl">{title}</h1>
        </div>
        <div className="flex items-center justify-center">
          <img src={headerIcon.login} alt="로그인 아이콘" className="mr-2" />
          <Link to="/" onClick={handleAuthClick}>
            {isLoggedIn ? "로그아웃" : "로그인 해주세요"}
          </Link>
        </div>
      </div>
      <nav className="flex h-16 items-center justify-center bg-myblue">
        <ul className="mt-2 flex gap-14 rounded-t-xl bg-mywhite p-3 px-40">
          <li>
            <Link to="/upLoad" className={getLinkClass("/upLoad")}>
              <img
                src={getIcon(
                  "/upLoad",
                  headerIcon.photoUpload,
                  headerIcon.photoUploadActive,
                )}
                alt="사진업로드 아이콘"
              />
              사진업로드
            </Link>
          </li>
          <li>
            <Link
              to="/register-eachmedi"
              className={getLinkClass("/register-eachmedi")}
            >
              <img
                src={getIcon(
                  "/register-eachmedi",
                  headerIcon.register,
                  headerIcon.registerActive,
                )}
                alt="약 등록 아이콘"
              />
              약정보 등록
            </Link>
          </li>
          <li>
            <Link to="/mediinfo" className={getLinkClass("/mediinfo")}>
              <img
                src={getIcon(
                  "/mediinfo",
                  headerIcon.info,
                  headerIcon.infoActive,
                )}
                alt="복약정보 아이콘"
              />
              복약정보
            </Link>
          </li>
          <li>
            <Link to="/warnmedi" className={getLinkClass("/warnmedi")}>
              <img
                src={getIcon(
                  "/warnmedi",
                  headerIcon.search,
                  headerIcon.searchActive,
                )}
                alt="병용금기약품 아이콘"
              />
              병용금기약품
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
