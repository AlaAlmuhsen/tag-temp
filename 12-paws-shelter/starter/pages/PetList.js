import FilterBar from "../components/FilterBar";
import PetCard from "../components/PetCard";

function PetList() {
  // TODO: pets, isLoading and error come from usePets()
  //       isLoading → <Loader />
  //       error     → <Message message={error} />
  // TODO: read the type from the URL → useSearchParams()
  //       and show only the pets of that type
  //       no pets → <Message message="No pets of this type right now 😿" />
  const pets = [
    { id: 1, name: "Luna", emoji: "🐱", breed: "Tabby", age: 2, adopted: false },
    { id: 2, name: "Max", emoji: "🐶", breed: "Golden Retriever", age: 4, adopted: false },
    { id: 4, name: "Coco", emoji: "🐰", breed: "Holland Lop", age: 1, adopted: false },
    { id: 5, name: "Rocky", emoji: "🐕", breed: "Mixed", age: 7, adopted: true },
  ];

  return (
    <>
      <FilterBar />

      <ul className="pet-list">
        {pets.map((pet) => (
          <PetCard pet={pet} key={pet.id} />
        ))}
      </ul>
    </>
  );
}

export default PetList;
