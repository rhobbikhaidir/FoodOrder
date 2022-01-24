import React, { Fragment } from "react";
import ReactDom from "react-dom";
import classes from "./Modal.module.css";

const BackDrop = (props) => (
  <div className={classes.backdrop} onClick={props.onClick} />
);

const ModalOverlays = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.content}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");

const Modal = (props) => {
  return (
    <Fragment>
      {ReactDom.createPortal(
        <BackDrop onClick={props.onClose} />,
        portalElement
      )}
      {ReactDom.createPortal(
        <ModalOverlays>{props.children}</ModalOverlays>,
        portalElement
      )}
    </Fragment>
  );
};

export default Modal;
