import {
  Router,
  ReactLocation,
  DefaultGenerics,
} from "@tanstack/react-location";
import { Home, Contact } from "./pages";

const location = new ReactLocation<DefaultGenerics>();

const App = () => (
  <Router
    location={location}
    routes={[
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
    ]}
  />
);

export default App;
