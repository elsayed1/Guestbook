import { useEffect, useState } from "react";
import { useNavigation } from "../context/Navigation";
import Home from "./Home";
import Login from "./Login";
import Register from "./Register";

const PrivateRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const { navigate } = useNavigation();
  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);

  return user ? children : null;
};

const Route = ({ path, children, currentPath }) => {
  return currentPath === path ? children : null;
};

const Router = () => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log(currentPath);
  useEffect(() => {
    const onLocationChange = () => {
      console.log("herer");

      setCurrentPath(window.location.pathname);
    };

    // listen for popstate event
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);

  return (
    <>
      <Route path="/login" currentPath={currentPath}>
        <Login />
      </Route>
      <Route path="/register" currentPath={currentPath}>
        <Register />
      </Route>
      <Route path="/" currentPath={currentPath}>
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Route>
    </>
  );
};

export default Router;
