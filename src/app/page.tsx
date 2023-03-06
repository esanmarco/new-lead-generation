import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession();
  return <h1>Dashboard</h1>;
}
