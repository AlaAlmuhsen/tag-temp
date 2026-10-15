import { useSearchParams } from "react-router-dom";
import { usePets } from "../contexts/PetsContext";
import FilterBar from "../components/FilterBar";
import PetCard from "../components/PetCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

function PetList() {
  const { pets, isLoading, error } = usePets();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  const filteredPets = type ? pets.filter((pet) => pet.type === type) : pets;

  if (isLoading) return <Loader />;

  if (error) return <Message message={error} />;

  return (
    <>
      <FilterBar />

      {filteredPets.length === 0 ? (
        <Message message="No pets of this type right now 😿" />
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
