import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function CustomModal(props) {
    const {show, showOnly, titulo, body, closeText, saveText, handleClose, handleSave} = props

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{titulo}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{body}</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose} >{closeText}</Button>
                {!showOnly &&
                    <Button variant="primary" onClick={handleSave} >{saveText}</Button>
                }
            </Modal.Footer>
        </Modal>
  );
}

export default CustomModal