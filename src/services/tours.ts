import API from "../api/axios";
import { Tour } from "../types/tour";

interface TourFilters {
  destination?: string;
  days?: string;
  guests?: string;
}

export const getTours = async (filters?: TourFilters): Promise<Tour[]> => {
  try {
    const response = await API.get<Tour[]>("/tours/", { params: filters });
    return response.data;
  } catch (error) {
    console.error("Error fetching tours:", error);
    return [];
  }
};
