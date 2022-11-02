import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormArray,
  FormControl,
  FormGroup,
  Validator,
  Validators,
} from '@angular/forms';
import {
  IRoasterDeclaration,
  RoasterDeclaration,
} from './roaster-plan-master-custom-model';
import { IShift, Shift } from './shift-model';
//import * as moment from 'moment';
import moment from 'moment';
import { ShiftAssignmentServiceService } from './shift-assignment.service';
import { IRoasterPlan, RoasterPlan } from './roaster-plan.model';
import { IEmployee } from './employee';

@Component({
  selector: 'app-shift-assignment',
  templateUrl: './shift-assignment.component.html',
  styleUrls: [
    './shift-assignment.component.css',
    './shift-assignment.component.scss',
  ],
})
export class ShiftAssignmentComponent implements OnInit {
  selectedCars = [3];
  // employees = [
  //   { id: 1, name: '1001 - Md. Aktartujjaman' },
  //   { id: 2, name: '1005 - Rownakul Hasan', disabled: false },
  //   { id: 3, name: '1032 - Saleha Ahmed' },
  //   { id: 4, name: '1027 - A. K. Md. Sazzad Hossain' },
  // ];

  employees: IEmployee[] = []

  shifts: IShift[] = [
    {
      ...new Shift(),
      id: 101,
      shiftName: 'Morning',
      locationName: 'Dhaka',
      weekends: 'Sat,Sun,Mon',
      inTime: moment().startOf('day'),
      outTime: moment(),
      totalWorkingHour: 10,
    },
    {
      ...new Shift(),
      id: 102,
      shiftName: 'Afternoon',
      locationName: 'Dhaka',
      weekends: 'Sat,Sun,Mon',
      inTime: moment().startOf('day'),
      outTime: moment(),
      totalWorkingHour: 5,
    },
  ];

  editForm = this.fb.group({
    roasterPlanMasterId: [],
    title: [],
    employeePinList: [],
    roasterPlanList: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder,
    protected shiftAssignmentService: ShiftAssignmentServiceService
  ) {}

  ngOnInit() {
    const shiftAssignForm = this.fb.group({
      shiftId: ['0: null', Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });
    this.listOfRoasterPlan.push(shiftAssignForm);
    this.shiftAssignmentService.loadEmployeeDataWithImages().subscribe(res => {
      this.employees = res.body!;
    })
  }

  onKeyDownTitle($event: any):void{
    console.log($event)
  }

  private createFromForm(): IRoasterDeclaration {
    return {
      ...new RoasterDeclaration(),
      roasterPlanMasterId: this.editForm.get(['roasterPlanMasterId'])!.value,
      title: this.editForm.get(['title'])!.value,
      employeePinList: this.editForm.get(['employeePinList'])!.value,
      roasterPlanList: this.editForm.get(['roasterPlanList'])!.value
      //roasterPlanList: this.processRoasterPlanData(this.listOfRoasterPlan)
    };
  }

  private processRoasterPlanData(roasterPlanList: FormArray):IRoasterPlan[]{
    const data: IRoasterPlan[] = [];
    for(let i = 0; i < roasterPlanList.controls.length; i++){
      const planForm = roasterPlanList.controls[i];
      const roasterPlan = {
        ...new RoasterPlan(),
        shiftId: planForm.get(['shiftId'])!.value,
        startDate: moment(planForm.get(['startDate'])!.value).format('YYYY-MM-DD'),
        endDate: moment(planForm.get(['endDate'])!.value).format('YYYY-MM-DD')
      }
      data.push(roasterPlan);
    }
    console.log(roasterPlanList);
    console.log(data);
    return data;
  }

  get listOfRoasterPlan(): FormArray {
    return this.editForm.controls['roasterPlanList'] as FormArray;
  }

  addNewFormRow(currentRowNumber: number, form: any): void {
    console.log(currentRowNumber);

    const shiftAssignForm = this.fb.group({
      shiftId: [null, Validators.required],
      startDate: [null, Validators.required],
      endDate: [null, Validators.required],
    });

    let previousFieldEndDate = form.get(['endDate'])!.value;
    if(previousFieldEndDate){
      // shiftAssignForm.get(['startDate'])!.setValue(moment(previousFieldEndDate, "DD-MM-YYYY").add('days', 1))
      console.log(previousFieldEndDate);
    //const afterAddingOneDay = previousFieldEndDate + 1;
    console.log(previousFieldEndDate)
    shiftAssignForm.get(['startDate'])!.setValue(previousFieldEndDate.setDate(previousFieldEndDate.getDate() + 1))
    }

    console.log(shiftAssignForm)
    this.listOfRoasterPlan.push(shiftAssignForm);

    console.log(this.listOfRoasterPlan);
  }

  getWorkingHourFromShift(shiftId: number): number {
    const shift = this.shifts.find((shift) => shift.id === shiftId);
    console.log(shiftId, shift);
    try {
      return shift.totalWorkingHour;
    } catch (ex) {
      return 0;
    }
  }

  onChangeShift(formName: any): void {
    // const shiftId = formName.get(['shiftId'])!.value;
    // console.log(shiftId);
    // formName
    //   .get(['totalWorkingHour'])!
    //   .setValue(this.getWorkingHourFromShift(shiftId));
  }

  deleteFormRow(selectedRowNumber: number): void {
    this.listOfRoasterPlan.removeAt(selectedRowNumber);
  }

  onSubmit(): void {
    alert('submitted');
    console.log(JSON.stringify(this.createFromForm()));
    this.shiftAssignmentService.createRoasterMaster(this.createFromForm()).subscribe(res => {
      alert('success')
    }, (error) => {
      alert('failed')
      console.log(error)
    })
    //console.log(this.editForm.get(['employeeIds']).value)
  }
}
