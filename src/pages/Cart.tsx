import React from 'react';
import { Row, Col, Stack } from 'react-bootstrap';
import CartItem from '../components/CartItem';
import { useShoppingCart } from '../context/ShoppingCartContext';
import OrderSummary from '../components/OrderSummary';

const Cart = () => {
  const { cartItems, cartQuantity } = useShoppingCart();
  return (
    <>
      <h1 className='d-inline me-3 align-middle'>Your shopping cart</h1>
      <span>({cartQuantity} items)</span>
      <Row xs={1} md={2} className='g-5 pt-4'>
        <Col md={8} className='d-flex justify-content-center align-items-center'>
          {cartItems.length ? (
            <Stack gap={3}>
              {cartItems.map((item) => (
                <CartItem key={item.id} {...item} />
              ))}
            </Stack>
          ) : (
            <h2>Your shopping cart is empty</h2>
          )}
        </Col>
        <Col md={4} className='px-0'>
          <OrderSummary />
        </Col>
      </Row>
    </>
  );
};

export default Cart;
