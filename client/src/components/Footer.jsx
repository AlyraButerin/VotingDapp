function Link({ uri, text }) {
  return (
    <a
      href={uri}
      target="_blank"
      rel="noreferrer"
      style={{ color: "black", margin: "5px" }}
    >
      {text}
    </a>
  );
}

function Footer() {
  return (
    <footer
      className="d-flex justify-content-end"
      style={{ backgroundColor: "#91bbd1" }}
    >
      <Link uri={"https://trufflesuite.com"} text={"Truffle"} />
      <Link uri={"https://reactjs.org"} text={"React"} />
      <Link uri={"https://soliditylang.org"} text={"Solidity"} />
      <Link uri={"https://ethereum.org"} text={"Ethereum"} />
    </footer>
  );
}

export default Footer;
