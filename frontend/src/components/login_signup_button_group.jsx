export default function LoginSignupButton({handleSharedLoginSignupState}) {
  return (
    <>
      <div className="flex gap-x-2 sm:gap-x-4">
        <button className="bg-[#3ABEF9] hover:bg-[#050C9C] px-4 py-2 duration-200 rounded-full" onClick={()=>handleSharedLoginSignupState(0)}>
          Login
        </button>
        <button className="bg-[#3ABEF9] hover:bg-[#050C9C] px-4 py-2 sm:mr-3 duration-200 rounded-full" onClick={()=>handleSharedLoginSignupState(1)}>
          SignUP
        </button>
      </div>
    </>
  );
}
