import VotesBanner from "./VotesBanner";
import ActionsBanner from "./ActionsBanner";
import ResultsBanner from "./ResultsBanner";

function Main() {

    return (
      <div  style={{border: "1px solid black"}}>
        <VotesBanner />
        <ActionsBanner />
        <ResultsBanner />
      </div>
    );
  }
  
  export default Main;