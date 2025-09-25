import api from "../api/axios";

export const loginUser = async (email: string, password: string) => {
  const formData = new URLSearchParams();
  formData.append("username", email);
  formData.append("password", password);

  const res = await api.post("/users/token", formData, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  return res.data;
};
