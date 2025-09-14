import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const [user, setUser] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(false);

  const backendURL = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const loadCreditsData = async () => {
    try {
      const { data } = await axios.get(`${backendURL}/api/user/credits`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);
      }
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };

const generateImage = async (prompt) => {
  try {
    const { data } = await axios.post(
      `${backendURL}/api/image/generate-image`,
      { prompt },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (data.success) {
      loadCreditsData();
      return data.resultImage;
    } else {
      toast.error(data.message || "No credits left");
      loadCreditsData();
      if (data.creditBalance === 0) {
        navigate("/buy");
      }
    }
  } catch (err) {
    console.log(err);
    if (err.response && err.response.status === 403) {
      toast.error("You have 0 credits left. Please buy more.");
      loadCreditsData();
      navigate("/buy");
    } else {
      toast.error(err.message);
    }
  }
};
  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
    setCredit(false);
  };

  useEffect(() => {
    if (token && token !== "") {
      loadCreditsData();
    }
  }, [token]);

  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendURL,
    token,
    setToken,
    credit,
    setCredit,
    loadCreditsData,
    logout,
    generateImage,
  };
  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
