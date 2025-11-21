import api from "./api";

export const pingMessages = async () => {
  const res = await api.get("/messages/ping");
  return res.data;
};
