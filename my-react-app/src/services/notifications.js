// src/api/notifications.js
import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

export const getNotifications = async () => {
  const token = localStorage.getItem("access_token");

  if (!token) {
    throw new Error("No access token found");
  }

  const res = await axios.get(`${API_BASE_URL}/notifications/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};
