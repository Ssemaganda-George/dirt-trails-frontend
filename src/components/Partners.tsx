import API from "../api/axios";
import { useEffect, useState } from "react";

interface Partner {
  id: number;
  name: string;
  logo_url: string;
}

const Partners = () => {
  const [partners, setPartners] = useState<Partner[]>([]);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const res = await API.get<Partner[]>("/partners"); // type explicitly
        setPartners(res.data);
      } catch (error) {
        console.error("Error fetching partners:", error);
      }
    };
    fetchPartners();
  }, []);

  if (partners.length === 0) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto text-center">
          <p className="text-gray-500">No partners available yet.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Our Partners</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 items-center">
          {partners.map((partner) => (
            <div
              key={partner.id}
              className="flex items-center justify-center p-4 bg-white rounded-xl shadow hover:shadow-lg transition-shadow duration-300"
            >
              <img
                src={partner.logo_url}
                alt={partner.name}
                className="max-h-16 object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Partners;
