import React, { useContext, useState } from "react";
import { Card, Button, Modal, Map } from "shared/components";
import { AuthContext } from "shared/context";

const PlaceItem = ({ imgUrl, title, address, description, id }) => {
    const [showMap, setShowMap] = useState(false);
    const { isLogged } = useContext(AuthContext);
    const [showConfirmation, setShowConfirmation] = useState(false);

    const openMapHandler = () => setShowMap(true);
    const closeMapHandler = () => setShowMap(false);

    const handleCloseConfirmation = () => setShowConfirmation(false);
    const handleDelete = () => {
        setShowConfirmation(false);
        console.log("DELETED");
    };

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
                    <Map city={"Đakovo"} />
                </div>
            </Modal>

            <Modal
                show={showConfirmation}
                header="Are you sure?"
                contentClassName={"place-item__modal-content"}
                footerClassName={"place-item__modal-actions"}
                footer={
                    <React.Fragment>
                        <Button inverse onClick={handleCloseConfirmation}>
                            Cancel
                        </Button>
                        <Button onClick={handleDelete}>Delete</Button>
                    </React.Fragment>
                }
            ></Modal>

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
                        {isLogged && (
                            <>
                                <Button to={`/places/${id}`}>Edit</Button>
                                <Button onClick={setShowConfirmation}>
                                    Delete
                                </Button>
                            </>
                        )}
                    </div>
                </Card>
            </li>
        </React.Fragment>
    );
};

export default PlaceItem;
