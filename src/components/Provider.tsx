import react, { ReactNode } from "react";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: ReactNode;
}
export const Provider = ({ children }: Props) => {
  return <SessionProvider>{children}</SessionProvider>;
};
