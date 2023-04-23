
import { format } from "date-fns";

export default function formatTime(timeString) {
  const formattedTime = format(new Date(timeString), "HH:mm dd/MM/yyyy");
  return formattedTime;
}
