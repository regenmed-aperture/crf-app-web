import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setCurrentView, UIView } from "../store/slices/uiStateSlice";

import { ReportStartView } from "../views/ReportStartView";
import { ReportConsentFormView } from "../views/ReportConsentFormView";
import { ReportQuestionsView } from "../views/ReportQuestionsView";
import { ReportResultsView } from "../views/ReportResultsView";
import { ReportNotFoundView } from "../views/ReportNotFoundView";
import { ReportAuthView } from "@/views/ReportAuthView";
import { isAuthenticated } from "@/util/auth";
import { setIsFetchingData } from "@/store/slices/reportStateSlice";

export const ReportRoute: React.FC = () => {
  const dispatch = useAppDispatch();

  const { currentView } = useAppSelector(state => state.uiState);

  useEffect(() => {
    // check authentication first
    if (!isAuthenticated()) {
      dispatch(setIsFetchingData(false));
      dispatch(setCurrentView(UIView.VIEW_AUTH));
    } else{
      dispatch(setCurrentView(UIView.VIEW_START))
    }
  }, [ dispatch ])

  switch (currentView) {
    case UIView.VIEW_AUTH:
      return <ReportAuthView />;
    case UIView.VIEW_START:
      return <ReportStartView />;
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
