import React from "react";
import { useSearchParams } from "react-router-dom";

const REPORT_ID_URL_KEY_NAME = "id"

export const ReportRoute: React.FC = () => {
  const [params] = useSearchParams();
  const reportId = params.get(REPORT_ID_URL_KEY_NAME);
  const isValidId = params.has(REPORT_ID_URL_KEY_NAME) && reportId?.trim() !== "";

  return !isValidId ? (
    <div className="">
      <p>No Id</p>
    </div>
  ) : (
    <div className="">
      <p>Id: {reportId}</p>
    </div>
  )
}
