import { ThemeSwitcher } from "../common/ThemeSwitcher";
import Avatar from "./Avatar";
import TitleAndCount from "./TitleAndCount";

const Header = () => {
  return (
    <div className="flex justify-between items-center px-7 py-5">
      <TitleAndCount />

      <div className="flex items-center gap-2">
        <ThemeSwitcher />
        <Avatar />
      </div>
    </div>
  );
};

export default Header;
