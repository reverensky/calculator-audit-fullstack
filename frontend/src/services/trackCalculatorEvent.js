import { fetchWrapper } from "../utils/fetchWrapper";
import { v4 as uuidv4 } from 'uuid';

const session_id = uuidv4();

export async function trackEvent({ action, value }) {
  const payload = {
    action,
    value,
    session_id,
  };

  const params = new URLSearchParams(payload).toString();
  await fetchWrapper(`/api/events?${params}`, {
    method: "POST",
    mode: "no-cors",
  });
}
