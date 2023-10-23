import { Button, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import formatCurrency from '../utilities/formatCurrency';
import { useShoppingCart } from '../context/ShoppingCartContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCartPlus,
  faPlus,
  faMinus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';

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
      <Link to={`/store/${id}`}>
        <Card.Img
          variant='top'
          src={imgUrl}
          height='250px'
          style={{ objectFit: 'contain', padding: '2em' }}
        />
      </Link>
      <Card.Body className='d-flex flex-column'>
        <Card.Title className='d-flex flex-column align-items-center mb-4 fs-6'>
          <div>
            <Link
              className='lh-sm text-center text-decoration-none'
              to={`/store/${id}`}
            >
              <div>
                <span className='text-dark'>{brand}</span>
              </div>
              <div>
                <span className='text-black-50'>{product}</span>
              </div>
            </Link>
          </div>
          <div className='mt-3'>
            <span className='text-black-50'>{formatCurrency(price)}</span>
          </div>
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

export default StoreItem;
