import "./App.css";
import NavigationProvider from "./context/Navigation";
import Router from "./Routes";

function App() {
  return (
    <NavigationProvider>
      <div className="App">
        <Router />
      </div>
    </NavigationProvider>
  );
}

export default App;
