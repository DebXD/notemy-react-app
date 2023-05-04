import react from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactElement;
}
export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
