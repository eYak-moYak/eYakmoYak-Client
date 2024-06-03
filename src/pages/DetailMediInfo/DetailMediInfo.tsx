import React from "react";
import { useParams } from "react-router-dom";
import BodyLayout from "../../components/Common/BodyLayout";
import DetailMediInfoContents from "./components/DetailMediInfoContents";

const DetailMediInfo = () => {
  const { prescriptionId } = useParams<{ prescriptionId: string }>();
  return (
    <div className="flex items-center justify-center">
      <BodyLayout>
        {prescriptionId && (
          <DetailMediInfoContents prescriptionId={prescriptionId} />
        )}
      </BodyLayout>
    </div>
  );
};

export default DetailMediInfo;
