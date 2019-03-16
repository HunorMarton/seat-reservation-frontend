import { action } from 'typesafe-actions';
import { Dispatch } from 'redux';
import { getSelectedSeat } from '../../selectors/seats';
import { State } from '../rootReducer';

export const LOADING = '@SEATS/LOADING';
export const LOADED = '@SEATS/LOADED';
export const RESERVING = '@SEATS/RESERVING';
export const RESERVED = '@SEATS/RESERVED';
export const RESERVED_BY_SOMEONE_ELSE = '@SEATS/RESERVED_BY_SOMEONE_ELSE';
export const CANCELING = '@SEATS/CANCELING';
export const CANCELLED = '@SEATS/CANCELLED';
export const CANCELLED_BY_SOMEONE_ELSE = '@SEATS/CANCELLED_BY_SOMEONE_ELSE';

export const loading = () => action(LOADING, {});
export const loaded = (seats: any) => action(LOADED, { seats });
export const reserving = () => action(RESERVING, {});
export const reserved = (row: number, column: string) => action(RESERVED, { row, column });
export const reservedBySomeoneElse = (row: number, column: string) =>
  action(RESERVED_BY_SOMEONE_ELSE, { row, column });
export const cancelling = () => action(CANCELING, {});
export const cancelled = (row: number, column: string) => action(CANCELLED, { row, column });
export const cancelledBySomeoneElse = (row: number, column: string) =>
  action(CANCELLED_BY_SOMEONE_ELSE, { row, column });

export const loadInitialData = (socket: any) => {
  return (dispatch: Dispatch) => {
    dispatch(loading());
    socket.on('initialList', (data: any) => {
      console.dir(data);
      dispatch(loaded(data));
    });
  };
};

export const reserve = (socket: any, row: number, column: string) => {
  return (dispatch: Dispatch, getState: () => State) => {
    dispatch(reserving());

    const alreadySelectedSeat = getSelectedSeat(getState());
    console.log(alreadySelectedSeat);
    if (alreadySelectedSeat) {
      dispatch(cancelling());
      console.log('canceling', row, column);

      socket.emit('cancel', { row: alreadySelectedSeat.row, column: alreadySelectedSeat.column });

      dispatch(cancelled(row, column));
    }

    console.log('reserving');
    socket.emit('reserve', { row, column });

    dispatch(reserved(row, column));
  };
};
