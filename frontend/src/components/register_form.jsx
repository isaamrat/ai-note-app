import React, { useState } from "react";
import signUpUser from "../controllers/signup_handler";

export default function RegisterForm({
  handleSharedLoginSignupState,
  handleShowToast,
}) {
  const [user_name, setUserName] = useState("");
  const [email, setUserEmail] = useState("");
  const [user_pass, setUserPassword] = useState("");

  const handleSignUp = async () => {
    try {
      const userData = { user_name, email, user_pass }; // Assuming these are state variables
      const response = await signUpUser(userData);

      // Handle successful response (e.g., show success message)
      console.log("Sign up successful:", response);

      // Show toast message and change to login state
      handleShowToast("Sign up successful! Please log in.");

      // Reset form fields if needed
      setUserName("");
      setUserEmail("");
      setUserPassword("");
    } catch (error) {
      // Handle API request error (e.g., show error message)
      console.error("Sign up failed:", error.message);

      // Show toast message and change to login state
      handleShowToast("Sign up unsuccessful! Please try again.");
      // Optionally handle error state in your component
    }
  };

  const handleLoginClick = () => {
    // Handle navigation or show login modal
    console.log("Navigate to login page or show modal");
  };

  return (
    <>
      <div className="container bg-white sm:m-8 mt-8 sm:mt-0 p-5 rounded-sm sm:w-96 sm:mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-center text-[#050C9C]">
            Create an Account!
          </h1>
          <div className="text-center text-gray-400 text-sm">Sign up now</div>
        </div>

        <div className="container p-5">
          <div className="flex items-center justify-center">
            <div className="relative">
              <input
                id="user_name"
                className="border-b-2 py-1 px-3 focus:outline-none focus:border-[#050C9C] focus:border-b-2 transition-colors peer"
                type="text"
                placeholder="Enter Name"
                value={user_name}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <div className="relative">
              <input
                id="user_email"
                className="border-b-2 py-1 px-3 focus:outline-none focus:border-[#050C9C] focus:border-b-2 transition-colors peer"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setUserEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="flex items-center justify-center mt-5">
            <div className="relative">
              <input
                id="user_password"
                className="border-b-2 py-1 px-3 focus:outline-none focus:border-[#050C9C] focus:border-b-2 transition-colors peer"
                type="password"
                placeholder="Enter Password"
                value={user_pass}
                onChange={(e) => setUserPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="w-full mt-5 flex justify-center">
            <button
              className="bg-[#3ABEF9] hover:bg-[#050C9C] px-10 py-2 sm:px-12 sm:py-3 rounded-full text-white transition-all"
              onClick={handleSignUp}
            >
              SignUP
            </button>
          </div>
          <div className="flex justify-center text-sm mt-5">
            <div>Already have an account?</div>
            <a
              href="javascript:void(0)"
              className="ml-1 text-[#3ABEF9] hover:underline hover:text-[#050C9C]"
              onClick={() => handleSharedLoginSignupState(0)}
            >
              Login Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
