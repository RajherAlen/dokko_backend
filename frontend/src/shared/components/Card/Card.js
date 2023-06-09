import React from "react";

const Card = ({ className, style, children }) => {
	return (
		<div className={`card ${className ? className : ""}`} style={style}>
			{children}
		</div>
	);
};

export default Card;
