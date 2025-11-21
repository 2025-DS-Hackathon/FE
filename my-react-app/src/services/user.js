import api from "./api";

export const getMyInfo = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    console.error("❌ getMyInfo 실패:", error);
    throw error;
  }
};


export const updateMyProfile = async (birthYear, termsAgreed) => {
  try {
    const token = localStorage.getItem("access_token");

    const body = {
      birth_year: birthYear,
      terms_agreed: termsAgreed,
    };

    const res = await api.patch("/users/me/profile", body, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return res.data;
  } catch (error) {
    console.error("❌ updateMyProfile 실패:", error.response?.data || error);
    throw error;
  }
};

