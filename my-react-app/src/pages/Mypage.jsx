import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Mypage() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");

    if (token) {
      navigate("/mypage-user");
    } else {
      navigate("/mypage-guest");
    }
  }, []);

  return null;
}
