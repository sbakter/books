import { Outlet } from "react-router-dom";
import Header from "../components/Header";

/**
 * Root component that renders the header and nested routes.
 * @returns {JSX.Element} - The rendered component.
 */
function Root() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default Root;
