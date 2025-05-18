import { fetchWrapper } from "../utils/fetchWrapper";

export async function trackEvent({ action, value }) {
  const payload = {
    id: 1,
    action,
    value,
  };

  const params = new URLSearchParams(payload).toString();
  await fetchWrapper(`/api/events?${params}`, {
    method: "POST",
    mode: "no-cors",
  });
}
