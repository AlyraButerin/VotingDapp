import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';

function ProposalsList() {
    const [proposals] = useState([]);

    return (
        <Container>
            <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">List of Proposals</Nav.Link>
      </Nav.Item>
      
    </Nav>
        <select class="form-select" multiple aria-label="multiple select example">
        {proposals && proposals.length > 0
            ? proposals.map((description, index) => (
        <option key={index} value={description}>{description}</option>
        ))
        : null}
      </select>
      </Container>
    );
  }
  
  export default ProposalsList;