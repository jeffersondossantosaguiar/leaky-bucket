import { createRoot } from "react-dom/client";

const App = () => (
  <div>
    <h1>APP TOKEN BUCKET</h1>
  </div>
);

createRoot(document.getElementById("app")!).render(<App />);