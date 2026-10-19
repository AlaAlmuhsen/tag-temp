import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPlant } from "../../services/apiPlants";

// WRITE data: useMutation({ mutationFn })
// Mutations don't run on their own: you call mutate(newPlant) yourself
export function useAddPlant() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPlant,
    // The list in the cache is now out of date. Mark it as stale
    // and every component showing ["plants"] refetches it 🔄
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["plants"] }),
  });
}
