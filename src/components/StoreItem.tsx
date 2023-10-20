import { Button, Card } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faPlus, faMinus, faTrash } from '@fortawesome/free-solid-svg-icons';

type StoreItemProps = {
  id: number;
  brand: string;
  product: string;
  price: number;
  imgUrl: string;
};

const StoreItem = ({ id, brand, product, price, imgUrl }: StoreItemProps) => {
  const {
    getItemQuantity,
    increaseCartQuantity,
    decreaseCartQuantity,
    removeFromCart,
  } = useShoppingCart();

  const quantity = getItemQuantity(id);

  return (
    <Card className='h-100'>
      <Card.Img
        variant='top'
        src={imgUrl}
        height='250px'
        style={{ objectFit: 'contain', padding: '2em' }}
      />
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex justify-content-between align-items-baseline mb-4'>
          <div>
            <div>
              <span className='fs-3'>{brand}</span>
            </div>
            <div>
              <span className='fs-6'>{product}</span>
            </div>
          </div>
          <span className='ms-2 text-muted'>{formatCurrency(price)}</span>
        </Card.Title>
        <div className='mt-auto'>
          {quantity === 0 ? (
            <Button
              className='w-100 btn-sm'
              onClick={() => increaseCartQuantity(id)}
            >
              <FontAwesomeIcon icon={faCartPlus} />
              <span className='m-2'>add to cart</span>
            </Button>
          ) : (
            <div
              className='d-flex align-items-center flex-column'
              style={{ gap: '.5rem' }}
            >
              <div
                className='d-flex align-items-center justify-content-center'
                style={{ gap: '.5rem' }}
              >
                <Button
                  variant='light'
                  className='rounded-circle btn-sm'
                  onClick={() => decreaseCartQuantity(id)}
                >
                  <FontAwesomeIcon icon={faMinus} />
                </Button>
                <div>
                  <span className='fs-6'>{quantity}</span>
                </div>
                <Button
                  variant='light'
                  className='rounded-circle btn-sm'
                  onClick={() => increaseCartQuantity(id)}
                >
                  <FontAwesomeIcon icon={faPlus} />
                </Button>
              </div>
              <Button
                onClick={() => removeFromCart(id)}
                variant='danger'
                size='sm'
                className='mt-2 w-100'
              >
                <FontAwesomeIcon icon={faTrash} />
                <span className='m-2'>remove</span>
              </Button>
            </div>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
