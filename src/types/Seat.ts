export default interface Seat {
  row: number;
  column: string;

  fee: number;

  reserved: boolean;
  reservedBySomeoneElse: boolean;
}
