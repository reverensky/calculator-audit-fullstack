// usePageAnalytics.js
import { useEffect } from "react";
import { trackEvent } from "../services/trackEvent";

export function usePageAnalytics() {
  useEffect(() => {
    trackEvent({
      eventType: "view",
    });
  }, [window.location.href]);
}
