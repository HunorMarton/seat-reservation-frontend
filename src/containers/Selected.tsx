import React from 'react';
import { connect } from 'react-redux';
import { State } from '../ducks/rootReducer';
import SeatType from '../types/Seat';
import { getSelectedSeat } from '../selectors/seats';
import './Selected.css';

type Props = {
  reservedSeat: SeatType;
};

const Selected: React.FC<Props> = props => {
  const { reservedSeat } = props;
  if (reservedSeat) {
    return (
      <div className="selected">
        <div className="selected__seat">
          <div className="selected__seat__label">Seat</div>
          <div>{`${reservedSeat.row}${reservedSeat.column}`}</div>
        </div>
        <div className="selected__fee">
          <div className="selected__seat__label">Fee</div>
          <div>{reservedSeat.fee}</div>
        </div>
      </div>
    );
  }

  return <div className="selected">Select a seat below</div>;
};

const mapStateToProps = (state: State) => ({
  reservedSeat: getSelectedSeat(state)
});

export default connect(mapStateToProps)(Selected);
