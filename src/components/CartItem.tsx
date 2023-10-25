import { useState } from 'react';
import { useShoppingCart } from '../context/ShoppingCartContext';
import storeItems from '../data/items.json';
import { Stack, Card } from 'react-bootstrap';
import formatCurrency from '../utilities/formatCurrency';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Quantity from './Quantity';

type CartItemProps = {
  id: number;
  quantity: number;
};

const CartItem = ({ id, quantity }: CartItemProps) => {
  const { removeFromCart, increaseCartQuantity, decreaseCartQuantity } =
    useShoppingCart();

  const handleQuantityIncrease = () => {
    increaseCartQuantity(id, 1);
  };

  const handleQuantityDecrease = () => {
    decreaseCartQuantity(id);
  };

  const item = storeItems.find((item) => item.id === id);

  if (item === null) return null;

  return (
    <Card className='shadow-sm'>
      <Card.Body>
        <Stack gap={4} direction='horizontal'>
          <div>
            <img src={item?.imgUrl} style={{ height: '30px' }} />
          </div>
          <div className='me-auto' style={{ width: '40%' }}>
            <div style={{ fontWeight: 'bold' }}>{item?.brand}</div>
            <div>{item?.product}</div>
          </div>
          {/*           <div className='px-2 mx-auto'>{quantity > 1 ? quantity : '1'}</div> */}
          <Quantity
            quantity={quantity}
            handleQuantityIncrease={handleQuantityIncrease}
            handleQuantityDecrease={handleQuantityDecrease}
          />
          <div className='px-2 mx-auto'>{formatCurrency(item?.price || 0)}</div>
          <div className='px-2'>
            {formatCurrency((item?.price || 0) * quantity)}
          </div>
          {/*       <div style={{ cursor: 'pointer' }}>
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => removeFromCart(item?.id || 0)}
        />
      </div> */}
        </Stack>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
