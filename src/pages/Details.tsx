import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import storeItems from '../data/items.json';
import formatCurrency from '../utilities/formatCurrency';
import { Col, Row, Button, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft,
  faMinus,
  faPlus,
  faCartPlus,
} from '@fortawesome/free-solid-svg-icons';
import { useShoppingCart } from '../context/ShoppingCartContext';
import ItemAddedModal from '../components/ItemAddedModal';
import Quantity from '../components/Quantity';

const Details = () => {
  const { id } = useParams();
  const [qty, setQty] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [showItemAddedModal, setShowItemAddedModal] = useState(false);

  const {
    // getItemQuantity,
    increaseCartQuantity,
    // decreaseCartQuantity,
    // removeFromCart,
    // cartQuantity,
  } = useShoppingCart();

  const handleQuantityIncrease = () => {
    setQty(qty + 1);
  };

  const handleQuantityDecrease = () => {
    setQty(qty - 1);
  };

  const item = storeItems.find((item) => item.id === Number(id));

  if (item == null) return null;

  const getItemAdded = () => {
    return {
      ...item,
      itemQuantity: qty,
      itemSize: selectedSize,
    };
  };

  const getItemMeta = () => {
    return {
        size: selectedSize,
        color: null,
        width: null,
    }
  }

  // const quantity = getItemQuantity(Number(item.id));

  return (
    <>
      <Row className='fs-6 my-4'>
        <Link to='/store'>
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
      </Row>
      <Row xs={1} md={2} className='g-3'>
        <Col md={7} style={{ border: '1px solid #E9E9E9' }}>
          <div className='mx-auto'>
            <img
              src={item.imgUrl}
              style={{ objectFit: 'contain', padding: '2em', width: '100%' }}
            />
          </div>
        </Col>
        <Col md={5} className='ps-md-4'>
          <div className='fs-2 fw-bold lh-sm'>{item.brand}</div>
          <div className='fs-4'>{item.product}</div>
          <div className='fs-6 text-muted'>{item.description}</div>
          <div className='fs-5 fw-bold my-3'>{formatCurrency(item.price)}</div>
          <div className='fw-lighter mb-2'>
            {selectedSize ? `Size: ${selectedSize}` : 'Size'}
          </div>
          <Form.Select
            onChange={(e) =>
              setSelectedSize(() => {
                if (e.target.value === 'Select Size') {
                  return null;
                } else {
                  return e.target.value;
                }
              })
            }
            aria-label='Select Size'
          >
            <option>Select Size</option>
            {item.size.map((size, idx) => (
              <option key={idx} id={`option-${idx}`} value={size}>
                {size}
              </option>
            ))}
          </Form.Select>
          <div className='mt-4'>
            <div className='d-flex flex-column' style={{ gap: '.5rem' }}>
              <div className='fw-lighter'>Quantity</div>
              <Quantity
                quantity={qty}
                handleQuantityIncrease={handleQuantityIncrease}
                handleQuantityDecrease={handleQuantityDecrease}
              />
              <Button
                className='w-100 btn-sm mt-3'
                onClick={() => {
                  increaseCartQuantity(item.id, qty, getItemMeta());
                  setShowItemAddedModal(true);
                }}
                disabled={selectedSize && qty ? false : true}
              >
                <FontAwesomeIcon icon={faCartPlus} />
                <span className='m-2'>
                  add to cart - {formatCurrency(item.price * qty)}
                </span>
              </Button>
              <ItemAddedModal
                show={showItemAddedModal}
                setShow={setShowItemAddedModal}
                item={getItemAdded()}
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

export default Details;
