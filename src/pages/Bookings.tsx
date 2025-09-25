import { useEffect, useState } from "react";
import { getBookings } from "../services/bookings";

const Bookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const data = await getBookings();
      setBookings(data);
    };
    fetchBookings();
  }, []);

  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-3xl font-bold mb-8 text-green-700">Bookings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings.map((b: any, i: number) => (
          <div key={i} className="bg-white p-4 rounded-lg shadow hover:shadow-lg transition">
            <h3 className="font-semibold text-lg">{b.customer_name}</h3>
            <p className="text-gray-600">{b.tour_name}</p>
            <span className="text-green-600 font-bold">{b.status}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Bookings;
