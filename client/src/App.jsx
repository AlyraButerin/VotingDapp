import { EthProvider } from "./contexts/EthContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";


function App() {
  return (
    <EthProvider>
      <div id="App">
        <div className="container">
          <Header />
          <hr />
          <Main />
          <hr />
          <Footer />
        </div>
      </div>
    </EthProvider>
  );
}

export default App;
