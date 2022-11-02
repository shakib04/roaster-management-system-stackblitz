import { Moment } from 'moment';

export interface IRoasterPlan {
  id?: number;
  startDate?: any;
  endDate?: any;
  roasterPlanMasterId?: number;
  shiftId?: number;
}

export class RoasterPlan implements IRoasterPlan {
  constructor(
    public id?: number,
    public startDate?: any,
    public endDate?: any,
    public roasterPlanMasterId?: number,
    public shiftId?: number
  ) {}
}
