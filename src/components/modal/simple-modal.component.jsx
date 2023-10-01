import { Button, Modal } from 'react-bootstrap';

const SimpleModal = ({modalConfig}) => {
    const {showModal, handleClose, title, bodyName, footerConfig} = modalConfig;
    return (
        <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{bodyName}</Modal.Body>
            <Modal.Footer>
                {
                    footerConfig.map(({id, variant, clickHandler, buttonName}) => {
                        return <Button key = {id} variant={variant} onClick={clickHandler}>
                            {buttonName}
                        </Button>
                    })
                }
            </Modal.Footer>
        </Modal>
    );
}

export default SimpleModal;