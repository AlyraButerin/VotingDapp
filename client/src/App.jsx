import { VoteProvider } from "./contexts/VoteContext";
import { ConnectionProvider } from "./contexts/ConnectionContext";
import { TxProvider } from "./contexts/TxContext/TxContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Main from "./components/Main";
import Container from "react-bootstrap/Container";
import { Stack } from "react-bootstrap";

function App() {
  // const [isConnected, setIsConnected] = useState(false);

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
        <Container
          // direction="vertical"
          fluid
          style={{ color: "black", height: "100%", margin: "0", padding: "0" }}
        >
          {/* style={{ position: "relative", top: "0" }} */}
          <ConnectionProvider>
            <VoteProvider>
              <TxProvider>
                {/* <Container
                  className="containerA"
                  // direction="vertical"
                  fluid
                  style={{ color: "black", height: "100%", padding: "0" }}
                > */}
                {/* <Container id="App" fluid style={{ height: "100%" }}> */}
                {/* <div className="container"> */}
                <Header
                  className="headerA"
                  style={{ color: "black", height: "40%", padding: "0" }}
                />
                <Container
                  className="containerA"
                  // direction="vertical"
                  fluid
                  style={{
                    color: "black",
                    height: "60%",
                    padding: "0",
                    margin: "0",
                  }}
                >
                  <Main
                    className="m-auto mainA"
                    // style={{ height: "auto", backgroundColor: "red" }}
                  />

                  {/* <Footer className="footerA" style={{ bottom: "0" }} /> */}
                  {/* </Container> */}
                  {/* </div> */}
                </Container>
              </TxProvider>
            </VoteProvider>
          </ConnectionProvider>
        </Container>
        <Footer
          className="footerA"
          style={{ backgroundColor: "#91bbd1" }}

          // style={{ position: "absolute", bottom: "0" }}
        />
        {/* </Container> */}
      </Container>
    </>
  );
}

export default App;
