import React, { useState, useLayoutEffect, useCallback } from "react";
import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";

/**
 * Manages events binded to a transaction
 *
 * - display alert information
 * - 2 states : succes /error
 *
 * @param {any} props
 */
export default function EventManager(props) {
  const [data, setData] = useState();
  const [show, setShow] = useState({
    status: false,
    type: "",
    data: "",
  });
  const [duration, setDuration] = useState(null);

  /**
   * handles result of the event
   *
   * - as they're no unsubcription, handles it by testing  type === ""
   * - if the event result is needed callback exists
   */
  const handleEventB = useCallback(
    function (error, event) {
      let type = show.type;
      let data = show.data;

      if (show.type === "") {
        if (error) {
          type = "danger";
          data = error;

          console.log("EVENTMANAGER/ error", error);
        } else {
          type = "success";
          data = event.returnValues;
          setDuration(5000);
          /*the event was initiated to forward its result*/
          // if (props.data.callback) {
          // if()
          //   props.forwardCelebration({
          //     id: data.kittenId,
          //     mumId: data.mumId,
          //     dadId: data.dadId,
          //     genes: data.genes,
          //     birthTime: data.birthTime,
          //     generation: data.generation,
          //     owner: data.owner,
          //   });
          console.log("EVENTMANAGER/ data", data);
          props.forwardAddVoter({
            voterAddress: data.voterAddress,
          });
          // }
        }
      }
      setShow({
        status: true,
        type: type,
        data: data,
      });
    },
    [show.type, show.data, props]
  );

  const handleEventVR = useCallback(
    function (error, event) {
      let type = show.type;
      let data = show.data;

      if (show.type === "") {
        if (error) {
          type = "danger";
          data = error;
        } else {
          type = "success";
          data = event.returnValues;
          setDuration(5000);
          /*the event was initiated to forward its result*/
          // if (props.data.callback) {
          // if()

          props.forwardAddVoter({
            voterAddress: data.voterAddress,
          });
          // }
        }
      }
      setShow({
        status: true,
        type: type,
        data: data,
      });
    },
    [show.type, show.data, props]
  );

  const handleEventPR = useCallback(
    function (error, event) {
      let type = show.type;
      let data = show.data;

      if (show.type === "") {
        if (error) {
          type = "danger";
          data = error;
        } else {
          type = "success";
          data = event.returnValues;
          setDuration(5000);
          /*the event was initiated to forward its result*/
          // if (props.data.callback) {
          // if()

          props.forwardProposalregistered({
            proposalId: data.proposalId,
          });
          // }
        }
      }
      setShow({
        status: true,
        type: type,
        data: data,
      });
    },
    [show.type, show.data, props]
  );

  const handleEventSP = useCallback(
    function (error, event) {
      let type = show.type;
      let data = show.data;
      console.log("EVENTMANAGER/ handleEventSP", error, event);
      if (show.type === "") {
        if (error) {
          type = "danger";
          data = error;
          console.log("EVENTMANAGER/ error", error);
        } else {
          type = "success";
          data = event.returnValues;
          setDuration(5000);
          /*the event was initiated to forward its result*/
          // if (props.data.callback) {
          // if()
          console.log("EVENTMANAGER/ data", data);

          props.forwardWorkflow({
            previousStatus: data.previousStatus.toString(),
            newStatus: data.newStatus, //si BN
          });
          // }
        }
      }
      setShow({
        status: true,
        type: type,
        data: data,
      });
    },
    [show.type, show.data, props]
  );

  const handleEventV = useCallback(
    function (error, event) {
      let type = show.type;
      let data = show.data;

      if (show.type === "") {
        if (error) {
          type = "danger";
          data = error;
        } else {
          type = "success";
          data = event.returnValues;
          setDuration(5000);
          /*the event was initiated to forward its result*/
          // if (props.data.callback) {
          // if()

          props.forwardVoted({
            voter: data.voter,
            proposalId: data.proposalId,
          });
          // }
        }
      }
      setShow({
        status: true,
        type: type,
        data: data,
      });
    },
    [show.type, show.data, props]
  );

  /**
   * handles the closure of the alert
   */
  // const handleOnClose = () => {
  //   setShow({
  //     status: false,
  //     type: "",
  //     data: null,
  //   });
  // };
  ///ICICI
  const handleOnClose = useCallback(() => {
    setShow({
      status: false,
      type: "",
      data: null,
    });
  }, []);
  /**
   * initializes a new event listener
   *
   * @todo try subscriptionID to unsubscribe, at the moment it doesn't work :
   * .on('connected', function(id){subscriptionId = id;});
   * then subscriptionId.unsubscribe();
   */
  const initSubscription = useCallback(
    async function () {
      setData(props.data);

      switch (props.data.name) {
        case "Birth":
          props.data.instance.events.Birth(handleEventB);
          break;
        case "VoterRegistered":
          props.data.instance.events.VoterRegistered(handleEventVR);
          console.log(
            "EVENTMANAGER/ VoterRegistered",
            props.data.instance.events.VoterRegistered
          );
          break;
        case "WorkflowStatusChange":
          props.data.instance.events.WorkflowStatusChange(handleEventSP);
          console.log(
            "EVENTMANAGER/ WorkflowStatusChange",
            props.data.instance.events.WorkflowStatusChange
          );
          break;
        case "ProposalRegistered":
          props.data.instance.events.ProposalRegistered(handleEventPR);
          console.log(
            "EVENTMANAGER/ ProposalRegistered",
            props.data.instance.events.ProposalRegistered
          );
          break;
        case "Voted":
          props.data.instance.events.Voted(handleEventV);
          console.log("EVENTMANAGER/ Voted", props.data.instance.events.Voted);
          break;
        default:
          break;
      }

      setShow({
        status: true,
        type: "",
        msg: "event initalized",
      });
    },
    [
      props.data,
      handleEventB,
      handleEventVR,
      handleEventSP,
      handleEventPR,
      handleEventV,
    ]
  );

  /**
   * get the content to display following the result of the event
   *
   * - error disabled cause already processed by txmanager (without info)
   */
  const getContent = () => {
    let content = "";

    if (show.type === "success") {
      switch (props.data.name) {
        case "Birth":
          content = (
            <>
              <p>
                <b>{`Your new kitten from generation ${show.data.generation} is born!`}</b>{" "}
                <i>Its information :</i>
              </p>
              <hr />
              <p>
                <b> {`Id : ${show.data.kittenId}`}</b>
                {` - mum Id : ${show.data.mumId} - dad Id : ${show.data.dadId} 
                            - genes : ${show.data.genes} - owner : ${show.data.owner}`}
              </p>
            </>
          );
          break;
        case "VoterRegistered":
          content = (
            <>
              <p>
                <b>{`New voter registered!`}</b> <i>Its information :</i>
              </p>
              <hr />
              <p>
                <b> {`Address : ${show.data.voterAddress}`}</b>
              </p>
            </>
          );
          break;
        case "WorkflowStatusChange":
          content = (
            <>
              <p>
                <b>{`Workflow status changed!`}</b> <i>Its information :</i>
              </p>
              <hr />
              <p>
                <b>
                  {" "}
                  {`Previous status : ${show.data.previousStatus} - New status : ${show.data.newStatus}`}
                </b>
              </p>
            </>
          );
          break;
        default:
          break;
      }
    } else if (show.type === "danger") {
      content = (
        <>
          <p>
            <b> {`${show.name} - Transaction failed, an error occured`}</b>
            {` - code : ${show.data.code}`}
          </p>
          <hr />
          <p>{`message : ${show.data.message}`}</p>
        </>
      );
    }
    return content;
  };

  useLayoutEffect(() => {
    if (!data) {
      //(data !== props.data) {
      initSubscription();
    }
  }, [props.data, data, initSubscription]);

  //ICICICICI
  useLayoutEffect(() => {
    let timer;
    if (show.status) {
      timer = setTimeout(() => {
        handleOnClose();
      }, duration);
      // setTimer(timer);
    }
    return () => {
      clearTimeout(timer);
    };
  }, [show.status, handleOnClose]);

  return (
    <>
      {show.status && show.type === "success" ? (
        <Alert
          variant={show.type}
          onClose={handleOnClose}
          dismissible
          style={{ fontSize: "0.8em" }}
        >
          {getContent()}
        </Alert>
      ) : null}
    </>
  );
}

EventManager.propTypes = {
  data: PropTypes.object,
  close: PropTypes.func,
};
