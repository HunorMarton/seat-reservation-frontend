import { ActionType } from 'typesafe-actions';
import * as seatsActions from './seats/actions';

type Action = ActionType<typeof seatsActions>;
export default Action;
