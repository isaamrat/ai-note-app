import React, { useState, useEffect } from "react";
import RegisterForm from "../components/register_form";
import LoginForm from "../components/login_form";
import LeftHeroSection from "../components/left_hero_section";
import AppBar from "../components/appbar";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [isSignUp, setIsSignUp] = useState(true);

  const [toastMessage, setToastMessage] = useState(""); // State for toast message
  const [showToast, setShowToast] = useState(false); // State to control toast visibility
  const navigate = useNavigate();
  const handleSharedLoginSignupState = (value) => {
    setIsSignUp(value === 0); // Assuming value will be 1 for sign-up and 0 for login
  };

  useEffect(() => {
    // let userEmail = sessionStorage.getItem("user_email");
    if (sessionStorage.getItem("user_email")) {
      navigate("/notes");
    }
    const fetchAvatarImage = async () => {
      try {
        const responseImage = await fetch(
          "https://avatar.iran.liara.run/public"
        );
        const blob = await responseImage.blob();
        const reader = new FileReader();
        reader.onloadend = () => {
          sessionStorage.setItem("avatarImage", reader.result);
        };
        reader.readAsDataURL(blob);
        if (!sessionStorage.getItem("avatarImage")) {
          sessionStorage.setItem(
            "avatarImage",
            "Loading"
          );
        }
      } catch (error) {
        sessionStorage.setItem(
          "avatarImage",
          "Loading"
        );
        console.error("Error fetching avatar:", error.message);
      }
    };
    if (!sessionStorage.getItem("avatarImage")) {
      fetchAvatarImage();
    }
  }, []);

  const handleShowToast = (message) => {
    setToastMessage(message);
    setShowToast(true);
    if (!message.includes("Sign up unsuccessful")) {
      handleSharedLoginSignupState(0); // Switch to login form after showing the toast
    }
    setTimeout(() => {
      setShowToast(false);
    }, 5000); // Hide toast after 5 seconds
  };

  return (
    <div className="font-Poppins w-full h-screen bg-[#A7E6FF]">
      <AppBar handleSharedLoginSignupState={handleSharedLoginSignupState} />
      <div className="flex justify-center items-center h-5/6 p-5">
        <div className="sm:grid lg:grid-cols-2 gap-1 h-5/6">
          <LeftHeroSection />
          <div className="flex items-center">
            {isSignUp ? (
              <LoginForm
                handleSharedLoginSignupState={handleSharedLoginSignupState}
                handleShowToast={handleShowToast}
              />
            ) : (
              <RegisterForm
                handleSharedLoginSignupState={handleSharedLoginSignupState}
                handleShowToast={handleShowToast}
              />
            )}
          </div>
        </div>
      </div>
      {showToast && (
        <div
          className={
            !toastMessage.includes("unsuccessful")
              ? "fixed bottom-4 left-1/2 transform -translate-x-1/2  bg-green-600 text-white px-4 py-2 rounded-full"
              : "fixed bottom-4 left-1/2 transform -translate-x-1/2  bg-red-600 text-white px-4 py-2 rounded-full"
          }
        >
          {toastMessage}
        </div>
      )}
    </div>
  );
}
