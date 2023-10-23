import { Modal } from 'react-bootstrap';

type ItemAddedModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
};

const ItemAddedModal = ({ show, setShow }: ItemAddedModalProps) => {
  return (
    <>
      <Modal show={show} fullscreen={'md-down'} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Modal</Modal.Title>
        </Modal.Header>
        <Modal.Body>Modal body content</Modal.Body>
      </Modal>
    </>
  );
};

export default ItemAddedModal;
