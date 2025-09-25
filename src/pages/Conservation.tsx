// src/pages/Conservation.tsx
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { getTrees, Tree } from "../services/trees";

// Green tree icon
const treeIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const Conservation = () => {
  const [trees, setTrees] = useState<Tree[]>([]);
  const [selectedTree, setSelectedTree] = useState<Tree | null>(null);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    // Fetch trees from API
    const fetchTrees = async () => {
      const data = await getTrees();
      setTrees(data);
    };
    fetchTrees();

    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => {
          console.error("Error fetching location:", error);
          // fallback to first tree if available, else Uganda center
          if (trees.length > 0) {
            setUserLocation([trees[0].latitude, trees[0].longitude]);
          } else {
            setUserLocation([0.3476, 32.5825]); // Kampala fallback
          }
        }
      );
    }
  }, [trees.length]);

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">
  Conservation Projects & Trees
</h1>

      {/* Map */}
      <div className="w-full h-[600px] rounded-lg overflow-hidden shadow-md">
        {userLocation && (
          <MapContainer
            center={userLocation}
            zoom={10}
            scrollWheelZoom={true}
            className="w-full h-full"
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {/* User Location Marker */}
            <Marker position={userLocation}>
              <Popup>You are here 📍</Popup>
            </Marker>

            {/* Tree Markers */}
            {trees.map((tree) => (
              <Marker key={tree.id} position={[tree.latitude, tree.longitude]} icon={treeIcon}>
                <Popup>
                  <div className="space-y-1">
                    <p
                      className="font-semibold text-green-700 cursor-pointer hover:underline"
                      onClick={() => setSelectedTree(tree)}
                    >
                      {tree.species}
                    </p>
                    <p><strong>Planted By:</strong> {tree.planted_by || "Unknown"}</p>
                    <p><strong>Planted On:</strong> {new Date(tree.planted_on).toLocaleDateString()}</p>
                    <p><strong>Location:</strong> {tree.latitude.toFixed(5)}, {tree.longitude.toFixed(5)}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>

      {/* Modal for full details */}
      {selectedTree && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl w-11/12 md:w-2/3 lg:w-1/2 p-6 relative">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
              onClick={() => setSelectedTree(null)}
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{selectedTree.species}</h2>
            <p><strong>Planted By:</strong> {selectedTree.planted_by || "Unknown"}</p>
            <p><strong>Planted On:</strong> {new Date(selectedTree.planted_on).toLocaleDateString()}</p>
            <p><strong>Count:</strong> {selectedTree.count}</p>
            <p className="mt-2"><strong>Notes:</strong> {selectedTree.notes || "No additional notes"}</p>
            <p className="mt-2"><strong>Location:</strong> {selectedTree.latitude}, {selectedTree.longitude}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Conservation;
