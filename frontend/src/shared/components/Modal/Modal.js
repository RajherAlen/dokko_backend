import React from "react";
import ReactDOM from "react-dom";
import { Backdrop } from "shared/components";
import { CSSTransition } from "react-transition-group";

const ModalOverlay = (props) => {
	const content = (
		<div className={`modal ${props.className ? props.className : ""}`} style={props.style}>
			<header className={`modal__header ${props.headerClassName ? props.headerClassName : ""}`}>
				<h2>{props.header}</h2>
			</header>

			<form onSubmit={props.onSubmit ? props.onSubmit : (event) => event.preventDefault()}>
				<div className={`modal__content ${props.contentClassName ? props.contentClassName : ""}`}>
					{props.children}
				</div>

				<footer className={`modal__footer ${props.footerClassName ? props.footerClassName : ""}`}>
					{props.footer}
				</footer>
			</form>
		</div>
	);
	return ReactDOM.createPortal(
		content,
		document.getElementById("modal-hook")
	);
};

const Modal = (props) => {
	return (
		<React.Fragment>
			{props.show && <Backdrop onClick={props.onCancel} />}
			<CSSTransition
				in={props.show}
				mountOnEnter
				unmountOnExit
				timeout={200}
				classNames="modal"
			>
				<ModalOverlay {...props} />
			</CSSTransition>
		</React.Fragment>
	);
};

export default Modal;
