import { Helmet } from "react-helmet-async";
import { GlobalCss } from "./global-css";


function App({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Helmet>
        <title>Vite + React + TS</title>
      </Helmet>
      <GlobalCss></GlobalCss>
      {children}
    </>
  );
}

export default App;
