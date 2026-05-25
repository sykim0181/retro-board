import { Link } from "react-router";

const AppLogo = () => {
  return (
    <Link to="/dashboard" className="flex items-center gap-[0.5rem] w-fit">
      <img src="/icon.svg" alt="RetroBoard" className="w-[1.2rem] h-[1.2rem]" />
      <span className="font-bold text-[1rem]">RetroBoard</span>
    </Link>
  );
};

export default AppLogo;
