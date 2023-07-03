import React, { useEffect, useState } from "react";
import Container from "react-bootstrap/Container";
import Nav from 'react-bootstrap/Nav';

function Whitelist () {
    const [whiteList, setWhiteList] = useState([]);

    return (
        <Container>
            <Nav variant="tabs" defaultActiveKey="/home">
      <Nav.Item>
        <Nav.Link href="/home">List of voters</Nav.Link>
      </Nav.Item>
      
    </Nav>
        <select class="form-select" multiple aria-label="multiple select example">
        {whiteList && whiteList.length > 0
            ? whiteList.map((address, index) => (
        <option key={index} value={address}>{address}</option>
        ))
        : null}
      </select>
      </Container>
      );
}
export default Whitelist;
