import { useNavigate } from "react-router-dom";
import Dropdown from "../dropdown/Dropdown";
import StarsFieldProvider from "../section/StarsFieldProvider";
import { useState } from "react";

const Header = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);

  return (
    <header className="bg-background text-accent w-full h-60 relative overflow-hidden flex flex-col items-start justify-between">
      <StarsFieldProvider stars={50} className=" absolute z-0" />
       <nav className="flex items-center justify-end w-full absolute z-10 p-6">
        <img 
          src="/menu_icon.png" 
          alt="Logo Starsfield" 
          className="cursor-pointer"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        />
       </nav>
       { isDropdownOpen  && (
        <Dropdown className=" w-1/2 h-1/2 z-20"/>
       )}
    </header>
  );
}
export default Header;