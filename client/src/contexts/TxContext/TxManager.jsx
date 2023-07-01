import React, {
  useState,
  useLayoutEffect,
  useCallback,
  useEffect,
} from "react";
import { useConnection } from "../../contexts/ConnectionContext";
import { useVote } from "../../contexts/VoteContext";

import PropTypes from "prop-types";

import Alert from "react-bootstrap/Alert";
// @todo : choose between alert and toast
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

/**
 * @dev  Manages one transaction
 *
 * - display alert with 3 states : initialised / processed / failed
 * - triggered by initTx from TxContext
 *
 * @param {object} data
 * @param {function} closeTx
 * @param {function} setAlertInvalidTx
 *
 * @todo : change the way the tx is initialized
 * uncomment React.StrictMode => error with txmanager rerendering initTx
 * @todo : instead of show status, directly remove the tx from the TxContext array
 */
export default function TxManager({ data, closeTx, setAlertInvalidTx }) {
  /* the tx has/not been sent, corresponding function, tx description */
  const [status, setStatus] = useState({
    sent: false,
    show: false,
    type: "",
    msg: "",
  });

  /**
   * initializes a tx following the desired function call
   * @dev : be sure to set the correct function name and event
   * @todo : change the way the tx is initialized
   * @todo : externalize send func.. to have a generic tx manager
   */
  const initTransaction = useCallback(
    async function () {
      const { contractInstance, functionName, params, fromAccount } = data;
      const show = true;
      const type = "secondary";
      let msg;

      switch (functionName) {
        case "AddVoter":
          msg = "Transaction initialized : adding voter";
          contractInstance.methods
            .addVoter(params)
            .send({ from: fromAccount }, handleTx)
            .on("error", function (e) {
              console.log("initTransaction/ error", e);
              setAlertInvalidTx("Invalid Tx: adding voter rejected");
            });
          break;
        case "startProposalsRegistering":
          msg = "Transaction initialized : starting proposal registering";
          contractInstance.methods
            .startProposalsRegistering()
            .send({ from: fromAccount }, handleTx)
            .on("error", function (e) {
              console.log("initTransaction/ error", e);
              setAlertInvalidTx(
                "Invalid Tx: starting proposal registering rejected"
              );
            });
          break;

        default:
          break;
      }

      setStatus({
        sent: true,
        show: show,
        type: type,
        msg: msg,
      });
    },
    [data, setAlertInvalidTx]
  );

  /**
   * @dev handles result of the tx
   * @param {any} error
   * @param {string} txHash
   *
   * @todo changes the error checking / -32000 is for contract rejection
   * -32603 from metamask (account in metamsk is not the one connected and/or fund are 0 ...)
   * / so 32603 will be triggered before error on tx (action of the user to confirm/reject)
   */
  const handleTx = (error, txHash) => {
    const show = true;
    let type, msg;

    if (error) {
      //available info : error.code, error.msg
      let cause = "";
      switch (error.code) {
        case -32000:
        case -32603:
          cause = "the contract rejected the transaction";
          break;
        case 4001:
        case 4100:
          cause = "transaction or account not authorized by the user";
          break;
        case 4200:
        case 4900:
        case 4901:
          cause = "provider not connected or not supporting the method";
          break;
        default:
          break;
      }
      type = "danger";
      msg = "Transaction failed : " + cause;
    } else {
      type = "success";
      msg = "Transaction processed / txHash : " + txHash;
    }
    setStatus({
      sent: true,
      show: show,
      type: type,
      msg: msg,
    });
  };

  /**
   * @dev handles the closure of the alert
   */
  const handleOnClose = () => {
    setStatus({
      sent: true,
      show: false,
      type: "",
      msg: null,
    });
    closeTx(data.id);
  };

  /**
   * @todo : change the way the tx is initialized (rendering issue when strict mode)
   */
  useLayoutEffect(() => {
    if (!status.sent) {
      initTransaction();
    }
  }, [status.sent, initTransaction]);

  return (
    <>
      {status.show ? (
        <Alert
          variant={status.type}
          onClose={handleOnClose}
          dismissible
          style={{ fontSize: "0.8em", lineHeight: "2em", overflow: "auto" }}
        >
          {status.msg}
        </Alert>
      ) : null}
      {/* {show.status ? (
        <ToastContainer
          className="p-3"
          position={"bottom-start"}
          style={{ zIndex: 1 }}
        >
          <Toast
            onClose={handleOnClose}
            show={show.status}
            delay={3000}
            autohide
          >
            <Toast.Header>
              <strong className="me-auto">Bootstrap</strong>
            </Toast.Header>
            <Toast.Body>{show.msg}</Toast.Body>
          </Toast>
        </ToastContainer>
      ) : null} */}
    </>
  );
}

TxManager.propTypes = {
  data: PropTypes.object,
  close: PropTypes.func,
};
