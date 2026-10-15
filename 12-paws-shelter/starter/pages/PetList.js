import FilterBar from "../components/FilterBar";
import PetCard from "../components/PetCard";

function PetList() {
  // TODO: read the type from the URL → useSearchParams()
  //       then fetch with useFetch(url). json-server filters for you:
  //         all pets  → `${API_URL}/pets`
  //         only cats → `${API_URL}/pets?type=cat`
  //       isLoading → <Loader />
  //       error     → <Message message={error} />
  //       no pets   → <Message message="No pets of this type right now 😿" />
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
