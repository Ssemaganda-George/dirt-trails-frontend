export interface Tree {
  id: number;
  species: string;
  latitude: number;
  longitude: number;
  planted_by?: string;
  planted_on?: string;
  notes?: string;
  count?: number;
}

export const getTrees = async (): Promise<Tree[]> => {
  const res = await fetch("http://127.0.0.1:8000/trees");
  const data = await res.json();
  // Ensure planted_on exists
  return data.map((tree: any) => ({
    ...tree,
    planted_on: tree.planted_on || new Date().toISOString(),
    count: tree.count || 1,
  }));
};
