import VotesBanner from "./VotesBanner";
import ProposalBanner from "./ProposalBanner";
import ResultsBanner from "./ResultsBanner";

function Main() {

    const Main =
    <>
      <VotesBanner />
      <ProposalBanner />
      <ResultsBanner />
    </>;



    return (
      <div className="Main">
        { Main }
      </div>
    );
  }
  
  export default Main;