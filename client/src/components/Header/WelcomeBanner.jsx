import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function WelcomeBanner() {
    return (
      <Navbar style = {{backgroundColor: "#91bbd1", color:"white", height:"150px"}}>
      <Container>
      <Navbar.Collapse className="justify-content-center">
          <h1>welcome</h1>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
  export default WelcomeBanner;