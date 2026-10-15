import pets from "../data/pets";
import FilterBar from "../components/FilterBar";
import PetCard from "../components/PetCard";

function PetList() {
  // TODO: read the type from the URL → useSearchParams()
  //       and show only the pets of that type
  //       no pets → <p className="empty">No pets of this type right now 😿</p>
  const filteredPets = pets;

  return (
    <>
      <FilterBar />

      <ul className="pet-list">
        {filteredPets.map((pet) => (
          <PetCard pet={pet} key={pet.id} />
        ))}
      </ul>
    </>
  );
}

export default PetList;
