import React from 'react';
import { Card, Button, Stack } from 'react-bootstrap';
import { useShoppingCart } from '../context/ShoppingCartContext';
import formatCurrency from '../utilities/formatCurrency';

const OrderSummary = () => {
  const { cartItems, cartSubTotal } = useShoppingCart();

  return (
    <>
      <Card className='shadow-sm'>
        <Card.Header>Order Summary</Card.Header>
        <Card.Body>
          <Stack direction='horizontal'>
            <div className='p-1'>Subtotal</div>
            <div className='p-1 ms-auto'>{formatCurrency(cartSubTotal())}</div>
          </Stack>
          <Stack direction='horizontal'>
            <div className='p-1'>Standard shipping</div>
            <div className='p-1 ms-auto'>FREE</div>
          </Stack>
          <Stack direction='horizontal'>
            <div className='p-1'>Estimated taxes</div>
            <div className='p-1 ms-auto'>--</div>
          </Stack>
          <Stack direction='horizontal'>
            <div className='p-1 fw-bold'>Order total</div>
            <div className='p-1 ms-auto fw-bold'>
              {formatCurrency(cartSubTotal())}
            </div>
          </Stack>
        </Card.Body>
      </Card>
      <Button className='w-100 mt-3' disabled={!cartItems.length}>Proceed to checkout</Button>
    </>
  );
};

export default OrderSummary;
