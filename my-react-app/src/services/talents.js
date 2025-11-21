import api from "./api";

export const pingTalents = async () => {
  const res = await api.get("/talents/talents/ping");
  return res.data;
};

export const createTalent = async (payload) => {
  const res = await api.post("/talents/talents", payload);
  return res.data;
};

export const getMyTalentSummary = async () => {
  const res = await api.get("/talents/talents/my-summary");
  return res.data;
};
