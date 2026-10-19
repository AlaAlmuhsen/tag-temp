import { queryOptions, useQuery } from "@tanstack/react-query";
import { getPlant } from "../../services/apiPlants";

// The key includes the id: ["plants", 1] and ["plants", 2] are 2 different cache entries.
// Shared by usePlant() AND the prefetch in PlantCard, so they always match
export function plantQueryOptions(id) {
  return queryOptions({
    queryKey: ["plants", id],
    queryFn: () => getPlant(id),
  });
}

export function usePlant(id) {
  return useQuery({
    ...plantQueryOptions(id),
    // Don't run the query until we have an id
    enabled: id !== null,
  });
}
