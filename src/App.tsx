import { GlobalCss } from "./global-css";


function App({ children }: {
  children: React.ReactNode;
}) {
  return (
    <>
      <GlobalCss></GlobalCss>
      {children}
    </>
  );
}

export default App;
