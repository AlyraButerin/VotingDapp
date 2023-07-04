import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Col, Row, Ratio, Stack } from "react-bootstrap";
import Jumbotron from "react-bootstrap";

function WelcomeBanner() {
  //VIRER P ET M 0
  return (
    // <Container fluid style={{ backgroundColor: "#91bbd1", color: "white" }}>
    <Stack
      direction="horizontal"
      gap={0}
      fluid
      style={{ backgroundColor: "#91bbd1", color: "white", height: "150px" }}
    >
      {/* <Container> */}
      {/* <Stack direction="horizontal" gap={0}> */}
      {/* <Navbar.Brand href="#home"> */}
      {/* <Ratio aspectRatio={20}> */}
      <Col xs={4} gap={4}>
        <img
          // className="p-5"
          className="img-fluid"
          style={{
            maxWidth: "200",
            minHeight: "100px",
            maxHeight: "250px",
            height: "auto",
          }}
          src="/logo.png"
          // width="200"
          // height="200"
          // className="d-inline-block align-top"
          alt="Voting System logo"
        />
      </Col>
      {/* </Ratio> */}
      {/* </Navbar.Brand> */}
      {/* <Ratio aspectRatio={70}> */}
      <Col className="p-0 m-0">
        {/* <Navbar.Collapse className="justify-content-center"> */}
        {/* <div class="container"> */}
        <Row className="p-0 m-0" style={{ fontSize: "4vw" }}>
          {/* <div class="col" style={{ fontSize: "5vw" }}> */}
          {/* <Form.Label style={{ fontSize: "5vw" }}> */}
          THE VOTING SYSTEM
          {/* </Form.Label> */}
          {/* </div> */}
        </Row>
        <Row class="row" style={{ fontSize: "2vw" }}>
          {/* <div class="col"> */}
          {/* <Form.Label style={{ fontSize: "30px", fontStyle: "italic" }}> */}
          On the Blockchain
          {/* </Form.Label> */}
          {/* </div> */}
        </Row>
        {/* </div> */}
        {/* </Navbar.Collapse> */}
      </Col>
      {/* </Ratio> */}
    </Stack>
    //   {/* </Container> */}
    // {/* </Container> */}
  );
}
export default WelcomeBanner;
