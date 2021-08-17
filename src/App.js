import "./App.css";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <div className="App"></div>
    </AuthProvider>
  );
}

export default App;
