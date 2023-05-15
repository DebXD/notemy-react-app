import Header from "@/components/header";
import Navbar from "../components/navbar";

interface Props {
  children: React.ReactElement;
}

export default function Layout({ children }: Props) {
  return (
    <>
      <Header />
      <Navbar />
      <main>{children}</main>
    </>
  );
}
