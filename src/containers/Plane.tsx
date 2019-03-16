import React from 'react';
import { connect } from 'react-redux';
import { State } from '../ducks/rootReducer';
import SeatType from '../types/Seat';
import Seat from '../components/Seat';
import { getSeatsGroupedByRow, getSelectedSeat } from '../selectors/seats';
import { reserve } from '../ducks/seats/actions';
import './Plane.css';

type Props = {
  socket: SocketIOClient.Socket;

  seatsGroupedByRow: SeatType[][];

  reserve: (socket: SocketIOClient.Socket, row: number, column: string) => void;
};

const Plane: React.FC<Props> = props => {
  const { socket, seatsGroupedByRow, reserve } = props;
  const handleReserve = (row: number, column: string) => reserve(socket, row, column);

  return (
    <div className="plane">
      {seatsGroupedByRow.map(row => (
        <div className="plane__row" key={row[0].row}>
          <span className="plane__row__header">Row {row[0].row}</span>
          {row.map(seat => (
            <Seat key={`${seat.row}${seat.column}`} {...seat} reserve={handleReserve} />
          ))}
        </div>
      ))}
    </div>
  );
};

const mapStateToProps = (state: State) => ({
  seatsGroupedByRow: getSeatsGroupedByRow(state),
  reservedSeat: getSelectedSeat(state)
});

export default connect(
  mapStateToProps,
  {
    reserve
  }
)(Plane);
