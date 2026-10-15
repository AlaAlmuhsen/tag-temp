import { useSearchParams } from "react-router-dom";
import { useFetch } from "../hooks/useFetch";
import { API_URL } from "../utils";
import FilterBar from "../components/FilterBar";
import PetCard from "../components/PetCard";
import Loader from "../components/Loader";
import Message from "../components/Message";

function PetList() {
  const [searchParams] = useSearchParams();
  const type = searchParams.get("type");

  // json-server can filter for us: /pets?type=cat
  const url = type ? `${API_URL}/pets?type=${type}` : `${API_URL}/pets`;
  const { data: pets, isLoading, error } = useFetch(url);

  return (
    <>
      <FilterBar />

      {isLoading && <Loader />}
      {error && <Message message={error} />}
      {!isLoading && !error && pets.length === 0 && (
        <Message message="No pets of this type right now 😿" />
      )}
      {!isLoading && !error && pets.length > 0 && (
        <ul className="pet-list">
          {pets.map((pet) => (
            <PetCard pet={pet} key={pet.id} />
          ))}
        </ul>
      )}
    </>
  );
}

export default PetList;
