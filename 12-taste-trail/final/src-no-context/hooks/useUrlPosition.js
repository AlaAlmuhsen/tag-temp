import { useSearchParams } from "react-router-dom";

// Reads ?lat=..&lng=.. from the URL
export function useUrlPosition() {
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  return [lat, lng];
}
