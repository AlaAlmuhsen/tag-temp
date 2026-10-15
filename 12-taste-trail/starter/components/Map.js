import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import Button from "./Button";
import styles from "./Map.module.css";

function dishIcon(emoji) {
  return L.divIcon({
    className: "dish-marker",
    html: `<span>${emoji}</span>`,
    iconSize: [40, 40],
    iconAnchor: [20, 20],
    popupAnchor: [0, -20],
  });
}

function Map() {
  // TODO: dishes should come from props (fetched in App)
  const dishes = [
    {
      id: 1,
      dishName: "Mansaf",
      emoji: "🍖",
      cityName: "Amman",
      position: { lat: 31.9539, lng: 35.9106 },
    },
  ];

  // TODO: mapPosition should be state, and follow the URL:
  //       /app/dishes/1?lat=31.95&lng=35.91 → useSearchParams()
  //       (later: extract it into a custom hook useUrlPosition)
  const mapPosition = [31.9539, 35.9106];

  // TODO: the map doesn't move when `center` changes. Create a component
  //       <ChangeCenter position={mapPosition} /> that calls
  //       useMap().setView(position) and render it inside <MapContainer>

  // TODO: clicking the map should open the form, with the position in the URL:
  //       <DetectClick /> → useMapEvents({ click: e => navigate(`form?lat=..&lng=..`) })
  //       navigate comes from useNavigate()

  return (
    <div className={styles.mapContainer}>
      {/* TODO: onClick → getPosition() from useGeolocation(),
                then move the map there. Hide the button after */}
      <Button type="position">Use your position</Button>

      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {dishes.map((dish) => (
          <Marker
            position={[dish.position.lat, dish.position.lng]}
            icon={dishIcon(dish.emoji)}
            key={dish.id}
          >
            <Popup>
              <span>{dish.emoji}</span>
              <span>
                {dish.dishName} · {dish.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;
