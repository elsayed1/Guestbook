import React, { createContext, useContext } from "react";

export const NavigationContext = createContext();

const NavigationProvider = ({ children }) => {
  const navigate = (route) => {
    window.history.pushState({}, "", route);

    const navEvent = new PopStateEvent("popstate");
    window.dispatchEvent(navEvent);
  };

  return (
    <NavigationContext.Provider value={{ navigate }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const { navigate } = useContext(NavigationContext);

  return { navigate };
};
export default NavigationProvider;
