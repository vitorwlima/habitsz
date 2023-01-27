import { type NextPage } from "next";
import { useAuthRoute } from "../hooks/useAuthRoute";
import { LandingPage } from "../landing-page";

const Home: NextPage = () => {
  useAuthRoute("hasToBeUnauthed");

  return <LandingPage />;
};

export default Home;
