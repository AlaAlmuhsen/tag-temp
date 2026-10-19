import { useQuery } from "@tanstack/react-query";
import { getPlants } from "../../services/apiPlants";

// READ data: useQuery({ queryKey, queryFn })
// - queryKey: the name of this data in the cache. Same key = same data, shared everywhere
// - queryFn:  how to get it (any function that returns a promise)
export function usePlants() {
  return useQuery({
    queryKey: ["plants"],
    queryFn: getPlants,
  });
}
