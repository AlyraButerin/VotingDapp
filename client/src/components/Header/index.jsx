import NetworkBanner from "./NetworkBanner";
import WelcomeBanner from "./WelcomeBanner";
import StatusBanner from "./StatusBanner";



function Header() {

  const Header =
    <>
      <NetworkBanner />
      <WelcomeBanner />
      <StatusBanner />
    </>;



    return (
      <div className="Header">
        { Header }
      </div>
    
    );
  }
  
  export default Header;