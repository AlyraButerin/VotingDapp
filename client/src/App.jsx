import { VoteProvider } from "./contexts/VoteContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import { TxProvider } from "./contexts/TxContext/TxContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Container from "react-bootstrap/Container";

function App() {
  // const [isConnected, setIsConnected] = useState(false);

  return (
    <ConnectionProvider>
      <VoteProvider>
        <TxProvider>
          <Container id="App" fluid style={{ height: "100%" }}>
            {/* <div className="container"> */}
            <Header />
            <Main />

            <Footer />
          </Container>
          {/* </div> */}
        </TxProvider>
      </VoteProvider>
    </ConnectionProvider>
  );
}

export default App;
