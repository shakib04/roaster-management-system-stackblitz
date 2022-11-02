import { Moment } from 'moment';
import { IShiftBreak } from '../model/shift-break-model';

export interface IShift {
  id?: number;
  shiftName?: string;
  shiftCode?: string;
  inTime?: Moment;
  outTime?: Moment;
  weekends?: string;
  totalBreakMinutes?: number;
  totalWorkingHour?: number;
  isGeneralShift?: boolean;
  isFlexScheduleAllowed?: boolean;
  isRoasterAssignmentAllowed?: boolean;
  isPublic?: boolean;
  isActive?: boolean;
  createdAt?: Moment;
  updatedAt?: Moment;
  locationId?: number;
  shiftBreaks?: IShiftBreak[];
  createdByLogin?: string;
  createdById?: number;
  updatedByLogin?: string;
  updatedById?: number;

  locationName?: string; //do not delete this
}

export class Shift implements IShift {
  constructor(
    public id?: number,
    public shiftName?: string,
    public shiftCode?: string,
    public inTime?: Moment,
    public outTime?: Moment,
    public weekends?: string,
    public totalBreakMinutes?: number,
    public totalWorkingHour?: number,
    public isGeneralShift?: boolean,
    public isFlexScheduleAllowed?: boolean,
    public isRoasterAssignmentAllowed?: boolean,
    public isPublic?: boolean,
    public isActive?: boolean,
    public createdAt?: Moment,
    public updatedAt?: Moment,
    public locationId?: number,
    public shiftBreaks?: IShiftBreak[],
    public createdByLogin?: string,
    public createdById?: number,
    public updatedByLogin?: string,
    public updatedById?: number,
    public locationName?: string
  ) {
    this.isGeneralShift = this.isGeneralShift || false;
    this.isFlexScheduleAllowed = this.isFlexScheduleAllowed || false;
    this.isRoasterAssignmentAllowed = this.isRoasterAssignmentAllowed || false;
    this.isPublic = this.isPublic || false;
    this.isActive = this.isActive || false;
  }
}
