import LoginSignupButton from "../components/login_signup_button_group";
import AppBarLogo from "./appbar_logo";

export default function AppBar({handleSharedLoginSignupState}) {
  return (
    <div className="bg-[#3572EF] flex text-white p-3 sm:px-5 items-center">
      <AppBarLogo/>
      <LoginSignupButton
        handleSharedLoginSignupState={handleSharedLoginSignupState}
      />
    </div>
  );
}
