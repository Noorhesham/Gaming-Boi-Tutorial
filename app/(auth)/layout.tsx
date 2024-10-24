import ButtonGradient from "../components/ButtonGradient";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import NavBar from "../components/nav/NavBar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <ButtonGradient />
      <div className="">{children}</div>
    </main>
  );
}
