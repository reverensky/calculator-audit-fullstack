export async function trackEvent({ action, value }) {
  const payload = {
    id: 1,
    action,
    value,
  };

  const params = new URLSearchParams(payload).toString();
  await fetch(`/api/events?${params}`, {
    method: "POST",
    mode: "no-cors",
  });
}
