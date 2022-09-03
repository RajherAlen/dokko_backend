import React, { useState } from "react";
import { Card, Button, Modal, Map } from "shared/components";

const PlaceItem = ({ imgUrl, title, address, description, id }) => {
	const [showMap, setShowMap] = useState(false);

	const openMapHandler = () => setShowMap(true);
	const closeMapHandler = () => setShowMap(false);

	return (
		<React.Fragment>
			<Modal
				show={showMap}
				onCancel={closeMapHandler}
				header={address}
				contentClassName={"place-item__modal-content"}
				footerClassName={"place-item__modal-actions"}
				footer={<Button onClick={closeMapHandler}>Close</Button>}
			>
				<div className="map-container">
					<Map position={[45.5485306, 18.6899196]} />
				</div>
			</Modal>

			<li className="place-item">
				<Card className="place-item__content">
					<div className="place-item__image">
						<img src={imgUrl} alt={title} />
					</div>
					<div className="place-item__info">
						<h2>{title}</h2>
						<h3>{address}</h3>
						<p>{description}</p>
					</div>

					<div className="place-item__actions">
						<Button onClick={openMapHandler} inverse>
							View on map
						</Button>
						<Button to={`/places/${id}`}>Edit</Button>
						<Button>Delete</Button>
					</div>
				</Card>
			</li>
		</React.Fragment>
	);
};

export default PlaceItem;
