import { RoasterPlan } from './roaster-plan.model';

export interface IRoasterDeclaration {
  roasterPlanMasterId?: number,
  title?: string;
  employeePinList?: string[];
  roasterPlanList?: RoasterPlan[];
}

export class RoasterDeclaration implements IRoasterDeclaration {
  constructor(
    public roasterPlanMasterId?: number,
    public title?: string,
    public employeePinList?: string[],
    public roasterPlanList?: RoasterPlan[]
  ) {}
}
