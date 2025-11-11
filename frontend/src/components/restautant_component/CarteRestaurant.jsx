import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Icon personalisé
const icon = L.icon({
    iconUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-icon.png",
    shadowUrl: "https://unpkg.com/leaflet@1.9.3/dist/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

export default function CarteRestaurant({position}) {
    if (!position || position.length !== 2 || position.some(coord => coord == null)) {
        return <p>Coordonnées non disponibles</p>; // ou afficher une map par défaut
    }

    return (
        <MapContainer
            center={position}
            zoom={15}
            style={{ height: "inherit"}}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="© OpenStreetMap"
            />

            <Marker position={position} icon={icon}>
                <Popup>
                    Le restaurant se trouve ici
                </Popup>
            </Marker>
        </MapContainer>
    );
}
