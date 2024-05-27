import "./App.css";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <div>
      <Header />
      <div className="appWrapper">
        <HomePage />
      </div>
    </div>
  );
}

export default App;
