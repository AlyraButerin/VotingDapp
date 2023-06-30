import { VoteProvider } from "./contexts/VoteContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  // const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectionProvider>
      <VoteProvider>
        <div id="App">
          <div className="container">
            <Header />
            <Main />

            <Footer />
          </div>
        </div>
      </VoteProvider>
    </ConnectionProvider>
  );
}

export default App;
