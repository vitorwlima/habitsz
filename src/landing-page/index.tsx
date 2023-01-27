import { signIn } from "next-auth/react";
import Image from "next/image";
import { useAuthRoute } from "../hooks/useAuthRoute";
import { Benefits } from "./components/Benefits";
import { Footer } from "./components/Footer";
import { GetStartedBanner } from "./components/GetStartedBanner";
import { Header } from "./components/Header";

const heatMapBenefits = [
  "Manage your habits",
  "Have a heat map of the last days",
  "Track your progress over time",
];

export const LandingPage: React.FC = () => {
  useAuthRoute("hasToBeUnauthed");

  const handleLogin = () => {
    signIn("google");
  };

  return (
    <main className="font-nunito min-h-screen bg-zinc-900 text-neutral-100">
      <Header login={handleLogin} />

      <section className="my-12 sm:my-16 md:my-20 lg:my-28">
        <h2 className="mx-auto px-2 text-center text-2xl font-bold leading-tight xs:max-w-lg xs:text-3xl  md:max-w-2xl md:text-4xl lg:max-w-4xl lg:text-5xl">
          Track your habits and start building your{" "}
          <strong className="text-blue-500">dream life</strong> NOW.
        </h2>
      </section>

      <section className="mx-auto my-12 flex max-w-[1520px] flex-col-reverse items-center justify-between px-4 sm:my-16 md:my-20 md:flex-row lg:my-28 lg:px-12">
        <Benefits benefits={heatMapBenefits} />
        <div className="mb-8 md:mb-0">
          <Image
            alt="habit heat map"
            src="/heat-map.png"
            width={827}
            height={412}
          />
        </div>
      </section>

      <section className="mx-auto my-12 flex max-w-[1520px] items-center justify-between px-4 sm:my-16 md:my-20 lg:my-28 lg:px-12">
        <GetStartedBanner login={handleLogin} />
      </section>

      <Footer />
    </main>
  );
};
