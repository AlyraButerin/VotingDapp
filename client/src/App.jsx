import { VoteProvider } from "./contexts/VoteContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import { TxProvider } from "./contexts/TxContext/TxContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";

function App() {
  // const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectionProvider>
      <VoteProvider>
        <TxProvider>
          <div id="App">
            <div className="container">
              <Header />
              <Main />

              <Footer />
            </div>
          </div>
        </TxProvider>
      </VoteProvider>
    </ConnectionProvider>
  );
}

export default App;
