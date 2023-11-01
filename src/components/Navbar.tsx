import {
  Badge,
  Button,
  Container,
  Nav,
  Navbar as NavbarBs,
} from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';
import { useShoppingCart } from '../context/ShoppingCartContext';

const Navbar = () => {
  const { cartQuantity } = useShoppingCart();
  const navigate = useNavigate();
  return (
    <>
      <NavbarBs sticky='top' className='bg-white shadow-sm mb-3'>
        <Container>
          <Nav className='me-auto'>
            <Nav.Link to={'/'} as={NavLink}>
              Home
            </Nav.Link>
            <Nav.Link to={'/store'} as={NavLink}>
              Store
            </Nav.Link>
            <Nav.Link to={'/about'} as={NavLink}>
              About
            </Nav.Link>
          </Nav>
          <Button
            variant='link'
            disabled={cartQuantity === 0}
            className='text-decoration-none'
            onClick={() => navigate('/cart')}
          >
            Cart
            <Badge pill bg='primary' className='ms-2'>
              {cartQuantity}
            </Badge>
            <span className='visually-hidden'>cart items</span>
          </Button>

          {/*           {
            <h6>
              <Badge pill bg='primary' className='shadow-lg'>
                {cartQuantity}
              </Badge>
            </h6>
          } */}
        </Container>
      </NavbarBs>
    </>
  );
};

export default Navbar;
