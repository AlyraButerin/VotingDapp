import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Row } from "react-bootstrap";

function WelcomeBanner() {
  return (
    <Navbar
      style={{ backgroundColor: "#91bbd1", color: "white", height: "150px" }}
    >
      <Container>
        <Navbar.Brand href="#home">
          <img
            src="/logo.png"
            width="200"
            height="200"
            className="d-inline-block align-top"
            alt="React Bootstrap logo"
          />
        </Navbar.Brand>
        <Navbar.Collapse className="justify-content-center">
          <div class="container">
            <div class="row">
              <div class="col">
                <Form.Label style={{ fontSize: "70px" }}>
                  THE VOTING SYSTEM
                </Form.Label>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <Form.Label style={{ fontSize: "30px", fontStyle:"italic" }}>
                  On the Blockchain
                </Form.Label>
              </div>
            </div>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
export default WelcomeBanner;
