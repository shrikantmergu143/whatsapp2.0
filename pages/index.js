import Head from "next/head";
import Sidebar from "../components/Sidebar";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  
  return (
    <div>
      <Head>
        <title>Whatsapp 2.0</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Sidebar router={router} />
    </div>
  );
}
