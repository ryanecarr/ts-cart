import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import storeItems from '../data/items.json';
import formatCurrency from '../utilities/formatCurrency';
import { Col, Row, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMinus,
  faPlus,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useShoppingCart } from '../context/ShoppingCartContext';
import ItemAddedModal from './ItemAddedModal';

const StoreItemDetails = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [showItemAddedModal, setShowItemAddedModal] = useState(false);

  const {
    // getItemQuantity,
    increaseCartQuantity,
    // decreaseCartQuantity,
    // removeFromCart,
    // cartQuantity,
  } = useShoppingCart();

  const item = storeItems.find((item) => item.id === Number(id));

  if (item == null) return null;

  // const quantity = getItemQuantity(Number(item.id));

  return (
    <>
      <Row className='fs-6 my-4'>
        <Link to='/store'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </Row>
      <Row xs={1} md={2} className='g-3'>
        <Col style={{ border: '1px solid #E9E9E9' }}>
          <img
            src={item.imgUrl}
            style={{ objectFit: 'contain', padding: '2em' }}
            className='mx-auto d-block'
          />
        </Col>
        <Col className='ps-4'>
          <div className='fs-2 fw-bold'>{item.brand}</div>
          <div className='fs-4'>{item.product}</div>
          <div className='fs-5 fw-bold mt-3'>{formatCurrency(item.price)}</div>
          <div className='mt-5'>
            <div className='d-flex flex-column' style={{ gap: '.5rem' }}>
              <div className='d-flex' style={{ gap: '.5rem' }}>
                <Button
                  variant='light'
                  className='rounded-circle btn-sm'
                  onClick={() => setQty(qty - 1)}
                  disabled={qty === 1}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <div>
                  <span className='fs-6'>{qty}</span>
                </div>
                <Button
                  variant='light'
                  className='rounded-circle btn-sm'
                  onClick={() => setQty(qty + 1)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>

              <Button
                className='w-100 btn-sm mt-3'
                onClick={() => {
                  increaseCartQuantity(item.id, qty);
                  setShowItemAddedModal(true);
                }}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <span className='m-2'>
                  add to cart - {formatCurrency(item.price * qty)}
                </span>
              </Button>
              <ItemAddedModal
                show={showItemAddedModal}
                setShow={setShowItemAddedModal}
              />
              {/*                 <Button
                  onClick={() => removeFromCart(item.id)}
                  variant='danger'
                  size='sm'
                  className='mt-2 w-100'
                >
                  <FontAwesomeIcon icon={faTrash} />
                  <span className='m-2'>remove</span>
                </Button> */}
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default StoreItemDetails;
