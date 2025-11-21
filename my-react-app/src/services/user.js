// src/services/user.js
import api from "./api";

/**
 * ⭐ 현재 로그인한 사용자 정보 조회
 * GET /users/me
 */
export const getMyInfo = async () => {
  try {
    const res = await api.get("/users/me");
    return res.data;
  } catch (error) {
    console.error("❌ getMyInfo 실패:", error);
    throw error;
  }
};

/**
 * ⭐ 내 정보 수정(출생연도, 약관동의)
 * PATCH /users/me/profile
 */
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

