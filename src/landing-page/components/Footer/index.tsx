import Link from "next/link";
import { Title } from "../../../components/Title";

const links = [
  {
    name: "Terms of use",
    href: "/terms-of-use",
  },
  {
    name: "Privacy Policy",
    href: "/privacy-policy",
  },
  {
    name: "Contact Us",
    href: "/contact",
  },
];

export const Footer: React.FC = () => {
  return (
    <footer className="flex flex-col items-center gap-4 bg-gradient-to-r from-blue-800 to-zinc-900 py-6 px-12">
      <section className="flex w-full flex-col items-center justify-between gap-6 lg:flex-row lg:gap-0">
        <Title />

        <div className="flex flex-col items-center gap-4 xs:flex-row xs:gap-8">
          {links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="text-center font-bold">
          Built by{" "}
          <Link
            href="https://www.linkedin.com/in/vitor-windberg/"
            target="_blank"
            className="text-blue-600"
          >
            Vitor
          </Link>{" "}
          and{" "}
          <Link
            href="https://www.linkedin.com/in/giovana-windberg-403281239/"
            target="_blank"
            className="text-blue-600"
          >
            Giovana
          </Link>
        </div>
      </section>
      <p className="mt-12 text-sm lg:mt-0">© 2023 Habitsz</p>
    </footer>
  );
};
