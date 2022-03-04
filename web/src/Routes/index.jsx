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

const Route = ({ path, children }) => {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  console.log(currentPath);
  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    // listen for popstate event
    window.addEventListener("popstate", onLocationChange);

    return () => {
      window.removeEventListener("popstate", onLocationChange);
    };
  }, []);
  return currentPath === path ? children : null;
};

const Router = () => {
  return (
    <>
      <Route path="/login">
        <Login />
      </Route>
      <Route path="/register">
        <Register />
      </Route>
      <Route path="/">
        <PrivateRoute>
          <Home />
        </PrivateRoute>
      </Route>
    </>
  );
};

export default Router;
