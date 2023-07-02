import NetworkBanner from "./NetworkBanner";
import WelcomeBanner from "./WelcomeBanner";
import StatusBanner from "./StatusBanner";



function Header() {

    return (
      <div  style={{border: "0.5px solid black"}}>
        <NetworkBanner />
        <WelcomeBanner />
        <StatusBanner />
     </div>
    
    );
  }
  
  export default Header;