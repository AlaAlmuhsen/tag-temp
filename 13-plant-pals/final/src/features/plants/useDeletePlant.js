import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePlant } from "../../services/apiPlants";

export function useDeletePlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePlant,
    // The 2nd argument is what we passed to mutate(id)
    onSuccess: (_data, id) => {
      // This plant doesn't exist anymore: throw its details out of the cache
      queryClient.removeQueries({ queryKey: ["plants", id] });
      queryClient.invalidateQueries({ queryKey: ["plants"] });
    },
  });
}
