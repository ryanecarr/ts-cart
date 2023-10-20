import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { Stack } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart } = useShoppingCart();

  const item = storeItems.find((item) => item.id === id);

  if (item === null) return null;

  return (
    <Stack
      direction='horizontal'
      gap={0}
      className='d-flex align-items-center'
      style={{ fontSize: '0.90rem' }}
    >
      <div
        className='d-flex justify-content-center pe-3'
        style={{ width: '20%' }}
      >
        <img src={item?.imgUrl} style={{ height: '40px' }} />
      </div>
      <div className='me-auto'>
        <div style={{ fontWeight: 'bold' }}>{item?.brand}</div>
        <div>{item?.product}</div>
        {quantity > 1 && (
          <span
            className='text-muted'
            style={{ fontSize: '0.75rem', fontWeight: 'bold' }}
          >
            x {quantity}
          </span>
        )}
        <div>{formatCurrency(item?.price)}</div>
      </div>
      <div className='px-2'>{formatCurrency(item?.price * quantity)}</div>
      <div style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => removeFromCart(item?.id)}
        />
      </div>
    </Stack>
  );
};

export default CartItem;
