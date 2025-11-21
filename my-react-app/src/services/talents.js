import api from "./api";

export const pingTalents = async () => {
  return api.get("/talents/talents/ping");
};

export const createTalent = async (payload) => {
  return api.post("/talents/talents", payload);
};

export const getMyTalentSummary = async () => {
  return api.get("/talents/talents/my-summary");
};

