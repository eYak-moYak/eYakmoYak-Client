import BodyLayout from "../../components/Common/BodyLayout";
import DetailMediInfoContents from "./components/DetailMediInfoContents";

type Props = {};

const DetailMediInfo = (props: Props) => {
  return (
    <div className="flex items-center justify-center">
      <BodyLayout>
        <DetailMediInfoContents />
      </BodyLayout>
    </div>
  );
};

export default DetailMediInfo;
