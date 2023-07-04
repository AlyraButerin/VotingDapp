import { Col, Row, Stack } from "react-bootstrap";

/* @todo : logo not loading cause in 'public' and vercel directory overrided for 'build' */
function WelcomeBanner() {
  return (
    <Stack
      direction="horizontal"
      gap={0}
      fluid
      style={{ backgroundColor: "#91bbd1", color: "white", height: "150px" }}
    >
      <Col xs={4} gap={4}>
        <img
          className="img-fluid"
          style={{
            maxWidth: "200",
            maxHeight: "250px",
            height: "auto",
          }}
          src="/logo.png"
          alt="Voting System logo"
        />
      </Col>

      <Col className="p-0 m-0">
        <Row className="p-0 m-0" style={{ fontSize: "4vw" }}>
          THE VOTING SYSTEM
        </Row>
        <Row class="row" style={{ fontSize: "2vw" }}>
          On the Blockchain
        </Row>
      </Col>
    </Stack>
  );
}
export default WelcomeBanner;
