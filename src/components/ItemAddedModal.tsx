import { useNavigate } from 'react-router-dom';
import { Modal, Row, Col, Button, Stack } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';

type Item = {
  id: number;
  brand: string;
  product: string;
  price: number;
  imgUrl: string;
  itemSize: number;
  itemQuantity: number;
};

type ItemAddedModalProps = {
  show: boolean;
  setShow: (value: boolean) => void;
  item: Item;
};

const ItemAddedModal = ({ show, setShow, item }: ItemAddedModalProps) => {
  const { cartQuantity, cartSubTotal } = useShoppingCart();
  const navigate = useNavigate();
  return (
    <>
      <Modal show={show} fullscreen={'md-down'} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Added to cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <div className='mx-auto'>
                <img
                  src={item?.imgUrl}
                  style={{
                    objectFit: 'contain',
                    padding: '2em',
                    width: '100%',
                  }}
                />
              </div>
            </Col>
            <Col>
              <Stack gap={1}>
                <div className='fw-bold'>{item.brand}</div>
                <div>{item.product}</div>
                <div>{`Size: ${item.itemSize}`}</div>
                <div>{`Qty: ${item.itemQuantity}`}</div>
                <div>{`Price: ${formatCurrency(
                  item.price * item.itemQuantity
                )}`}</div>
              </Stack>
            </Col>
          </Row>
          <Row className='pt-4'>
            <Col>
              <span className='fw-bold'>{`Cart subtotal: ${formatCurrency(
                cartSubTotal()
              )} (${cartQuantity} ${
                cartQuantity > 1 ? 'items' : 'item'
              })`}</span>
            </Col>
          </Row>
          <Row className='mt-4'>
            <Col>
              <Button onClick={() => navigate('/cart')} className='w-100'>Cart & Checkout</Button>
            </Col>
            <Col>
              <Button
                onClick={() => setShow(false)}
                className='w-100 btn-secondary'
              >
                Continue shopping
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ItemAddedModal;
