import { useSearchParams } from "react-router-dom";
import pets from "../data/pets";
import FilterBar from "../components/FilterBar";
import PetCard from "../components/PetCard";

function PetList() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const filteredPets = type ? pets.filter((pet) => pet.type === type) : pets;

  return (
    <>
      <FilterBar />

      {filteredPets.length === 0 ? (
        <p className="empty">No pets of this type right now 😿</p>
      ) : (
        <ul className="pet-list">
          {filteredPets.map((pet) => (
            <PetCard pet={pet} key={pet.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default PetList;
