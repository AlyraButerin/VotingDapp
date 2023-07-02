import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function WelcomeBanner() {
    return (
      <Navbar className="bg-body-tertiary">
      <Container>
      <Navbar.Collapse className="justify-content-center">
          <h1>welcome</h1>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    );
  }
  export default WelcomeBanner;