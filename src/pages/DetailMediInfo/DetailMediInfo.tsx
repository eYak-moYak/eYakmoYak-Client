import { useParams } from "react-router-dom";
import DetailMediInfoContents from "./components/DetailMediInfoContents";

const DetailMediInfo = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  return (
    <div className="flex items-center justify-center">
      {prescriptionId && (
        <DetailMediInfoContents prescriptionId={prescriptionId} />
      )}
    </div>
  );
};

export default DetailMediInfo;
