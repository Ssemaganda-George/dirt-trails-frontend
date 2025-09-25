import React, { useEffect, useState } from "react";
import { getTours } from "../services/tours";
import { Tour } from "../types/tour"; // import type

const Tours = () => {
  const [tours, setTours] = useState<Tour[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      const data: Tour[] = await getTours(); // Type is now known
      setTours(data);
    };
    fetchTours();
  }, []);

  return (
    <section className="py-24 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-12">Our Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tours.length === 0 ? (
            <p className="text-center col-span-full">No tours available yet.</p>
          ) : (
            tours.map((tour) => (
              <div key={tour.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                <img
                  src={tour.image_url}
                  alt={tour.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{tour.title}</h3>
                  <p className="text-gray-600 mb-2">{tour.description}</p>
                  <p className="font-bold text-green-600">${tour.price}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default Tours;
