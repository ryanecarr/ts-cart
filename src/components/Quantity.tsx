import React from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';

type QuantityProps = {
  quantity: number;
  handleQuantityIncrease: () => void;
  handleQuantityDecrease: () => void;
};

const Quantity = ({
  quantity,
  handleQuantityIncrease,
  handleQuantityDecrease,
}: QuantityProps) => {
  return (
    <div className='d-flex' style={{ gap: '.5rem' }}>
      <Button
        variant='light'
        className='rounded-circle btn-sm'
        onClick={() => handleQuantityDecrease()}
        disabled={quantity === 0}
      >
        <FontAwesomeIcon icon={faMinus} />
      </Button>
      <div>
        <span className='fs-6'>{quantity}</span>
      </div>
      <Button
        variant='light'
        className='rounded-circle btn-sm'
        onClick={() => handleQuantityIncrease()}
      >
        <FontAwesomeIcon icon={faPlus} />
      </Button>
    </div>
  );
};

export default Quantity;
