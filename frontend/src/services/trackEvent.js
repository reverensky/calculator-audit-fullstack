function getSessionId() {
  let sessionId = localStorage.getItem("sessionId");
  if (!sessionId) {
    const newSessionId = `sess_${Math.random().toString(36).substring(2)}`;
    localStorage.setItem("sessionId", newSessionId);
  }
  return sessionId;
}

function detectDeviceType() {
  const ua = navigator.userAgent;
  if (/Mobi|Android/i.test(ua)) return "mobile";
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  return "desktop";
}

export async function trackEvent({
  eventType,
  eventLabel,
  eventData,
  expressionState,
  isErrorState,
}) {
  const payload = {
    eventType,
    userId: getSessionId(),
    sessionId: localStorage.getItem("session_id") || "sess-" + Date.now(),
    eventLabel,
    eventData: JSON.stringify(eventData),
    expressionState,
    isErrorState,
    pageUrl: window.location.href,
    userAgent: navigator.userAgent,
    referrer: document.referrer,
    pageTitle: document.title,
    deviceType: detectDeviceType(),
    locale: navigator.language || navigator.userLanguage,
    timestamp: new Date().toISOString(),
    screenResolution: `${window.screen.width}x${window.screen.height}`,
    viewportSize: `${window.innerWidth}x${window.innerHeight}`,
  };

  const params = new URLSearchParams(payload).toString();
  await fetch(`/api/analytics/collect?${params}`, {
    method: "POST",
    mode: "no-cors",
  });
}
