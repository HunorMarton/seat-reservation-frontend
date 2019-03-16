import * as React from 'react';
import classNames from 'classnames';
import './Seat.css';

type Props = {
  row: number;
  column: string;
  reserved: boolean;
  fee: number;
  reservedBySomeoneElse: boolean;
  reserve: (row: number, column: string) => void;
};

const Seat: React.FC<Props> = props => {
  const { row, column, fee, reserved, reservedBySomeoneElse, reserve } = props;

  const handleClick = () => {
    if (!reservedBySomeoneElse) reserve(row, column);
  };

  return (
    <div
      className={classNames('seat', {
        'seat--reserved': reserved,
        'seat--reserved-by-someone-else': reservedBySomeoneElse
      })}
      onClick={handleClick}
    >
      <div className="seat__content">
        <span className="seat__fee">{fee}</span>
      </div>
    </div>
  );
};

export default Seat;
