import { Observable } from 'rxjs';
import {IEmployee} from './employee';
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpParams } from '@angular/common/http';
import { IRoasterDeclaration } from './roaster-plan-master-custom-model';
import { IRoasterPlan, RoasterPlan } from './roaster-plan.model';
//import * as moment from 'moment';
import moment from 'moment';

@Injectable({
  providedIn: 'root',
})
export class ShiftAssignmentServiceService {
  public resourceUrl = 'http://localhost:8080/api/attendance-mgt/roaster-declaration';

  public resourceUrlEmployeeImage = "http://localhost:8080/api/employee-mgt/import-image-upload?searchText=&size=10"

  constructor(protected http: HttpClient) {}

  createRoasterMaster(
    roasterPlanMaster: IRoasterDeclaration
  ): Observable<HttpResponse<IRoasterDeclaration>> {

    // const copy: IRoasterDeclaration = Object.assign({}, roasterPlanMaster, {
    //   startDate: roasterPlanMaster.
    // })

    roasterPlanMaster.roasterPlanList = this.processRoasterPlanData(roasterPlanMaster.roasterPlanList)

    return this.http.post<IRoasterDeclaration>(
      this.resourceUrl,
      roasterPlanMaster,
      {
        headers: {
          Authorization: 'Basic ' + btoa('admin:admin'),
        },
        observe: 'response',
      }
    );
  }

  loadEmployeeDataWithImages():Observable<HttpResponse<IEmployee[]>>{
    return this.http.get<IEmployee[]>(this.resourceUrlEmployeeImage, {
      headers: {
        Authorization: 'Basic ' + btoa('admin:admin'),
      },
      observe: 'response',
    })
  }

  private processRoasterPlanData(roasterPlanList: IRoasterPlan[]):IRoasterPlan[]{
    const data: IRoasterPlan[] = [];
    for(let i = 0; i < roasterPlanList.length; i++){
      const planForm = roasterPlanList[i];
      const roasterPlan = {
        ...new RoasterPlan(),
        shiftId: planForm.shiftId,
        startDate: moment(planForm.startDate).format('YYYY-MM-DD'),
        endDate: moment(planForm.endDate).format('YYYY-MM-DD')
      }
      data.push(roasterPlan);
    }
    console.log(roasterPlanList);
    console.log(data);
    return data;
  }

  createRequestOption = (req?: any): HttpParams => {
    let options: HttpParams = new HttpParams();
  
    if (req) {
      Object.keys(req).forEach(key => {
        if (key !== 'sort') {
          options = options.set(key, req[key]);
        }
      });
  
      if (req.sort) {
        req.sort.forEach((val: string) => {
          options = options.append('sort', val);
        });
      }
    }
  
    return options;
  };
}
