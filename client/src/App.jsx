import { VoteProvider } from "./contexts/VoteContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import { TxProvider } from "./contexts/TxContext/TxContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Container from "react-bootstrap/Container";

function App() {
  return (
    <>
      <Container
        fluid
        style={{
          color: "black",
          height: "95vh",
          padding: "0",
          margin: "0",
          backgroundColor: "#dce9ef",
        }}
      >
        <Container fluid style={{ height: "100%", margin: "0", padding: "0" }}>
          <ConnectionProvider>
            <VoteProvider>
              <TxProvider>
                <Header style={{ height: "40%", padding: "0" }} />
                <Container
                  fluid
                  style={{
                    height: "60%",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  <Main className="m-auto" />
                </Container>
              </TxProvider>
            </VoteProvider>
          </ConnectionProvider>
        </Container>
        <Footer style={{ backgroundColor: "#91bbd1" }} />
      </Container>
    </>
  );
}

export default App;
