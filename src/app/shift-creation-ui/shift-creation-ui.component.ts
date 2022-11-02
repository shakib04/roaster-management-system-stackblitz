import { Component, OnInit } from '@angular/core';
import {Validators, FormBuilder} from '@angular/forms';
//import * as moment from 'moment';
import moment from 'moment';
import { ILocation } from '../model/location';
import { IShift, Shift } from '../shift-assignment/shift-model';

@Component({
  selector: 'app-shift-creation-ui',
  templateUrl: './shift-creation-ui.component.html',
  styleUrls: ['./shift-creation-ui.component.css', './bootstrap.min.css', ]
})

export class ShiftCreationUiComponent implements OnInit {

  isSaving = false;
  locations: ILocation[] = [];

  daysOfWeek = ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]

  editForm = this.fb.group({
    id: [],
    shiftName: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
    shiftCode: [null, [Validators.required]],
    inTime: [null, [Validators.required]],
    outTime: [null, [Validators.required]],
    weekends: [],
    totalBreakMinutes: [],
    totalWorkingHour: [null, [Validators.min(0), Validators.max(24)]],
    isGeneralShift: [],
    isFlexScheduleAllowed: [],
    isRoasterAssignmentAllowed: [],
    isPublic: [],
    isActive: [],
    createdAt: [null, [Validators.required]],
    updatedAt: [],
    locationId: [],
    createdById: [null, Validators.required],
    updatedById: [],
    hasSaturdayMarked: [],
    shiftBreaksFormArray: this.fb.array([]),
  });

  constructor(
    private fb: FormBuilder) { }

  ngOnInit() {
  }

  private createFromForm(): IShift {
    return {
      ...new Shift(),
      id: this.editForm.get(['id'])!.value,
      shiftName: this.editForm.get(['shiftName'])!.value,
      shiftCode: this.editForm.get(['shiftCode'])!.value,
      inTime: this.editForm.get(['inTime'])!.value ? moment(this.editForm.get(['inTime'])!.value, DATE_TIME_FORMAT) : undefined,
      outTime: this.editForm.get(['outTime'])!.value ? moment(this.editForm.get(['outTime'])!.value, DATE_TIME_FORMAT) : undefined,
      weekends: this.editForm.get(['weekends'])!.value,
      totalBreakMinutes: this.editForm.get(['totalBreakMinutes'])!.value,
      totalWorkingHour: this.editForm.get(['totalWorkingHour'])!.value,
      isGeneralShift: this.editForm.get(['isGeneralShift'])!.value,
      isFlexScheduleAllowed: this.editForm.get(['isFlexScheduleAllowed'])!.value,
      isRoasterAssignmentAllowed: this.editForm.get(['isRoasterAssignmentAllowed'])!.value,
      isPublic: this.editForm.get(['isPublic'])!.value,
      isActive: this.editForm.get(['isActive'])!.value,
      createdAt: this.editForm.get(['createdAt'])!.value ? moment(this.editForm.get(['createdAt'])!.value, DATE_TIME_FORMAT) : undefined,
      updatedAt: this.editForm.get(['updatedAt'])!.value ? moment(this.editForm.get(['updatedAt'])!.value, DATE_TIME_FORMAT) : undefined,
      locationId: this.editForm.get(['locationId'])!.value,
      createdById: this.editForm.get(['createdById'])!.value,
      updatedById: this.editForm.get(['updatedById'])!.value,
      shiftBreaks: this.editForm.get(['shiftBreaks'])!.value,
    };
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    // this.isSaving = true;
    const shift = this.createFromForm();
    console.log(shift)
    // if (shift.id !== undefined) {
    //   this.subscribeToSaveResponse(this.shiftService.update(shift));
    // } else {
    //   this.subscribeToSaveResponse(this.shiftService.create(shift));
    // }
  }

  trackById(index: number, item: ILocation): any {
    return item.id;
  }

}

export const DATE_FORMAT = 'YYYY-MM-DD';
export const DATE_TIME_FORMAT = 'YYYY-MM-DDTHH:mm';
export const TIME_FORMAT = 'HH:mm';