import React, { useState } from "react";
import logInUser from "../controllers/login_handler";
import { useNavigate } from "react-router-dom";

export default function LoginForm({
  handleSharedLoginSignupState,
  handleShowToast,
}) {
  const [email, setEmail] = useState("");
  const [user_pass, setUserPass] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const userData = { email, user_pass };
      const response = await logInUser(userData);
      if (response["message"].includes("Wrong")) {
        console.log("Login unsuccessful:", response);
        // Show toast message and change to login state
        handleShowToast("Login unsuccessful. User not found!");
        // Reset form fields if needed
        setEmail("");
        setUserPass("");
      } else {
        console.log("Login successful:", response);
        // Show toast message and change to login state
        handleShowToast("Sign in successful!");
        // Reset form fields if needed
        setEmail("");
        setUserPass("");
        console.log(response.user_data.email);
        sessionStorage.setItem("user_email", response.user_data.email);
        sessionStorage.setItem("user_name", response.user_data.user_name);


        console.log(sessionStorage.getItem("user_email"));
        navigate("/notes");
      }
    } catch (error) {
      // Handle API request error (e.g., show error message)
      console.error("Login failed:", error.message);

      // Show toast message and change to login state
      handleShowToast("Login unsuccessful! Please try again.");
      // Optionally handle error state in your component
    }
  };

  return (
    <>
      <div className=" container bg-white h-fit sm:m-8 mt-8 sm:mt-0  p-5 rounded-sm sm:w-96 sm:mx-auto">
        <div>
          <h1 className="text-2xl font-semibold text-center text-[#050C9C]">
            Welcome Back!
          </h1>
          <div className=" text-center text-gray-400 text-sm">Login now.</div>
        </div>

        <div className="container p-5">
          <div className=" flex items-center justify-center">
            <div className=" relative">
              <input
                id="email"
                className=" border-b-2 py-1 focus:outline-none focus:border-[#050C9C] focus:border-b-2 transition-colors peer"
                type="email"
                placeholder="Enter Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className=" flex items-center justify-center mt-5">
            <div className=" relative">
              <input
                id="user_pass"
                className=" border-b-2 py-1 focus:outline-none focus:border-[#050C9C] focus:border-b-2 transition-colors peer"
                type="password"
                placeholder="Enter Password"
                value={user_pass}
                onChange={(e) => setUserPass(e.target.value)}
              />
            </div>
          </div>
          <div className=" w-full mt-5 flex  justify-center">
            <button
              className="bg-[#3ABEF9] hover:bg-[#050C9C] px-10 py-2 sm:mr-3 duration-700 rounded-full text-white transition-all"
              onClick={handleLogin}
            >
              LogIN
            </button>
          </div>
          <div className="flex justify-center text-sm mt-5">
            <div>Don't have an account?</div>
            <a
              href="#"
              className="ml-1 text-[#3ABEF9] hover:underline hover:text-[#050C9C]"
              onClick={() => handleSharedLoginSignupState(1)}
            >
              SignUP Here
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
