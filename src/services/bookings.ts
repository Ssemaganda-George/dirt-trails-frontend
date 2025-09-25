import axios from "../api/axios";

export interface Booking {
  id: number;
  userId: number;
  tourId: number;
  guests: number;
  date: string;
}

export const getBookings = async (): Promise<Booking[]> => {
  const response = await axios.get<Booking[]>("/bookings");
  return response.data;
};

export const createBooking = async (booking: Omit<Booking, "id">) => {
  const response = await axios.post("/bookings", booking);
  return response.data;
};
