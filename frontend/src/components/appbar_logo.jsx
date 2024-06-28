import { useNavigate } from "react-router-dom";

export default function AppBarLogo() {
  const navigate = useNavigate();
  return (
    <div className="flex-1">
      <div className="inline-block hover:scale-105 transition-all duration-300 hover:cursor-pointer" onClick={()=>navigate("/")}>
        <div className="font-extrabold text-3xl">My Notes</div>
        <div className="container flex items-center space-x-1">
          <div className="bg-white h-1 rounded-l-md w-full"></div>
          <div>AI</div>
        </div>
      </div>
    </div>
  );
}
