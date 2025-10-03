import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchReportData } from "../store/slices/reportStateSlice";
import { setCurrentView, UIView } from "../store/slices/uiStateSlice";

import { ReportLandingPageView } from "../views/ReportLandingPageView";
import { ReportLoadingView } from "../views/ReportLoadingView";
import { ReportConsentFormView } from "../views/ReportConsentFormView";
import { ReportQuestionsView } from "../views/ReportQuestionsView";
import { ReportResultsView } from "../views/ReportResultsView";
import { ReportNotFoundView } from "../views/ReportNotFoundView";

const REPORT_ID_URL_KEY_NAME = "id"

export const ReportRoute: React.FC = () => {
  const [ params ] = useSearchParams();
  const dispatch = useAppDispatch();
  
  const { isFetchingReport } = useAppSelector(state => state.reportState);
  const { currentView } = useAppSelector(state => state.uiState);

  useEffect(() => {
    const reportId = params.get(REPORT_ID_URL_KEY_NAME);
    const isValidId = params.has(REPORT_ID_URL_KEY_NAME) && reportId?.trim() !== "";

    if (isValidId) {
      // TODO: prompt user before deleting all data from previous report?
      dispatch(fetchReportData(reportId as string));
    } else {
      dispatch(setCurrentView(UIView.VIEW_NOT_FOUND));
    }
  }, [ params, dispatch ])

  if (isFetchingReport) return <ReportLoadingView />;

  switch (currentView) {
    case UIView.VIEW_LANDING:
      return <ReportLandingPageView />;
    case UIView.VIEW_CONSENT:
      return <ReportConsentFormView />;
    case UIView.VIEW_QUESTIONS:
      return <ReportQuestionsView />;
    case UIView.VIEW_RESULTS:
      return <ReportResultsView />;
    case UIView.VIEW_NOT_FOUND:
    default:
      return <ReportNotFoundView />; 
  }
}
