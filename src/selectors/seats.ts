import { createSelector } from 'reselect';
import { State } from '../ducks/rootReducer';

const getSeats = (state: State) => state.seats.seats;

const columnToNumber = (column: any): number => {
  const map: { [key: string]: number } = { A: 0, B: 1, C: 2, D: 3, E: 4, F: 5 };
  return map[column];
};

export const getSeatsGroupedByRow = createSelector(
  [getSeats],
  seats =>
    seats
      .sort(
        (a, b) => a.row * 100 + columnToNumber(a.column) - b.row * 100 + columnToNumber(b.column)
      )
      .reduce((acc, curr) => {
        if (acc.length !== 0 && acc[acc.length - 1][0].row === curr.row) {
          acc[acc.length - 1].push(curr);
          return acc;
        }
        acc.push([curr]);
        return acc;
      }, [])
);

export const getSelectedSeat = createSelector(
  [getSeats],
  seats => seats.find(seat => seat.reserved === true)
);
