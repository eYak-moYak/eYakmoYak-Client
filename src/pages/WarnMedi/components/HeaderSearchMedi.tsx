import HeaderAutoMediInput from "./HeaderAutoMediInput";

type Props = {};

const HeaderSearchMedi = (props: Props) => {
  return (
    <div className="relative bottom-56 right-7">
      <HeaderAutoMediInput />
      <button
        className="border-myblue-500 absolute right-28 top-4 z-50 h-8 w-16 border-2"
        type="button"
      >
        검색
      </button>
    </div>
  );
};

export default HeaderSearchMedi;
