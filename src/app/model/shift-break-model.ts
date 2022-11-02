import { Moment } from 'moment';

export interface IShiftBreak {
  id?: number;
  breakStartTime?: Moment;
  breakEndTime?: Moment;
  shiftId?: number;
}

export class ShiftBreak implements IShiftBreak {
  constructor(public id?: number, public breakStartTime?: Moment, public breakEndTime?: Moment, public shiftId?: number) {}
}