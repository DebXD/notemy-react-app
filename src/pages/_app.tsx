import Layout from "./layout";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { QueryClient, QueryClientProvider } from "react-query";
import { SessionProvider } from "next-auth/react";

const queryClient = new QueryClient();

// pages/_app.js

// fonts...
import { Poppins, Rubik, Bebas_Neue, Space_Mono } from "next/font/google";
const poppins = Poppins({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-poppins",
});

const rubik = Rubik({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-rubik",
});

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  style: "normal",
  variable: "--font-bebas",
});
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: "700",
  style: "normal",
  variable: "--font-spaceMono",
});

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <main
      className={`${poppins.variable} ${bebas.variable} ${rubik.variable} ${spaceMono.variable} bg-gray-900 h-screen`}
    >
      <QueryClientProvider client={queryClient}>
        <SessionProvider session={session}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </SessionProvider>
      </QueryClientProvider>
    </main>
  );
}
