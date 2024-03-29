import Action from '../Action';
import * as actions from './actions';
import Seat from '../../types/Seat';

interface State {
  seats: Seat[];
  loading: boolean;
}

const initialState: State = {
  seats: [],
  loading: false
};

export default function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    case actions.LOADING:
      return {
        ...state,
        loading: true
      };
    case actions.LOADED:
      return {
        ...state,
        seats: action.payload.seats.map((seat: Seat) =>
          seat.reserved ? { ...seat, reserved: false, reservedBySomeoneElse: true } : seat
        ),
        loading: false
      };
    case actions.RESERVING:
      return {
        ...state
      };
    case actions.RESERVED:
      console.log('reducer: reserved', action.payload.row, action.payload.column);
      return {
        ...state,
        seats: state.seats.map(seat =>
          seat.row === action.payload.row && seat.column === action.payload.column
            ? { ...seat, reserved: true }
            : seat
        )
      };
    case actions.RESERVED_BY_SOMEONE_ELSE:
      console.log('reducer: reserved by someone else', action.payload.row, action.payload.column);
      return {
        ...state,
        seats: state.seats.map(seat =>
          seat.row === action.payload.row && seat.column === action.payload.column
            ? { ...seat, reservedBySomeoneElse: true }
            : seat
        )
      };
    case actions.CANCELING:
      return {
        ...state
      };
    case actions.CANCELLED:
      console.log('reducer: cancelled', action.payload.row, action.payload.column);
      return {
        ...state,
        seats: state.seats.map(seat =>
          seat.row === action.payload.row && seat.column === action.payload.column
            ? { ...seat, reserved: false }
            : seat
        )
      };
    case actions.CANCELLED_BY_SOMEONE_ELSE:
      console.log('reducer: cancelled by someone else', action.payload.row, action.payload.column);
      return {
        ...state,
        seats: state.seats.map(seat =>
          seat.row === action.payload.row && seat.column === action.payload.column
            ? { ...seat, reservedBySomeoneElse: false }
            : seat
        )
      };
    default:
      return state;
  }
}
