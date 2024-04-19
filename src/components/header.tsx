import React from "react";

interface HeaderProps {
  title: string; // 타이틀을 위한 props
}

const Header: React.FC<HeaderProps> = ({ title }) => {
  return (
    <header>
      <h1>{title}</h1>
      <nav>
        <ul>
          <li>
            <a href="/">로그인·회원가입</a>
          </li>
          <li>
            <a href="/about">사진업로드</a>
          </li>
          <li>
            <a href="/services">복약정보</a>
          </li>
          <li>
            <a href="/contact">병용금기약품</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};
export default Header;
