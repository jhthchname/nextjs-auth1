import Navbar from "./Navbar";

export default function Layout({ children, user, showNavbar }) {
  return (
    <>
      {showNavbar && <Navbar user={user} />}
      <main>{children}</main>
    </>
  );
}
