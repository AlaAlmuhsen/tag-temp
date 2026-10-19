import { useMutation, useQueryClient } from "@tanstack/react-query";
import { waterPlant } from "../../services/apiPlants";

// OPTIMISTIC UPDATE: change the cache right away, before the server answers.
// The UI feels instant. If the server fails, put the old data back
export function useWaterPlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: waterPlant,

    // Runs BEFORE mutationFn
    onMutate: async (id) => {
      // Stop any refetch in progress, it would overwrite our optimistic data
      await queryClient.cancelQueries({ queryKey: ["plants"] });

      const previousPlants = queryClient.getQueryData(["plants"]);

      queryClient.setQueryData(["plants"], (plants = []) =>
        plants.map((plant) =>
          plant.id === id
            ? { ...plant, lastWatered: new Date().toISOString() }
            : plant
        )
      );

      // Whatever we return here is the `context` in onError
      return { previousPlants };
    },

    // Roll back
    onError: (_error, _id, context) => {
      queryClient.setQueryData(["plants"], context.previousPlants);
    },

    // Success OR error: sync with the server to be 100% sure.
    // ["plants"] also matches ["plants", 3], so the details refetch too
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["plants"] }),
  });
}
