import ButtonGradient from "../components/ButtonGradient";
import GridContainer from "../components/defaults/GridContainer";
import MaxWidthWrapper from "../components/defaults/MaxWidthWrapper";
import NavBar from "../components/nav/NavBar";
import SideBar from "../components/nav/SideBar";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className=" background">
      {" "}
      <ToastContainer
        position="top-center"
        autoClose={3500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        pauseOnHover={false}
        theme="light"
      />
      <ButtonGradient />
      <GridContainer className=" relative" cols={12}>
        <SideBar />
        <MaxWidthWrapper className="col-span-10 relative">
          <NavBar />
          {children}
        </MaxWidthWrapper>
      </GridContainer>
    </main>
  );
}
