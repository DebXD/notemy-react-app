import logo from "../../public/logo2.png";
import Image from "next/image";
const Logo = () => {
  return (
    <div>
      <Image src={logo} alt="image" height={20} width={25} className="" />
    </div>
  );
};

export default Logo;
