import { Injectable } from '@angular/core';
import { IShiftBreak } from '../model/shift-break-model';
import { Observable } from 'rxjs';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { IShift } from '../shift-assignment/shift-model';
import { SERVER_API_URL } from '../app.module';

@Injectable()
export class ShiftCreationService {
  public resourceUrl = SERVER_API_URL + 'api/attendance-mgt/shifts';

  constructor(protected http: HttpClient) {}

  calculateBreakMinutesAndHour(
    shift: IShift
  ): Observable<HttpResponse<IShift>> {
    const copy = this.convertDateFromClient(shift.shiftBreaks);
    return this.http.post<IShift>(this.resourceUrl, copy, {
      headers: {
        Authorization: 'Basic ' + btoa('admin:admin'),
      },
      observe: 'response',
    });
  }

  protected convertDateFromClient(shiftBreaks: IShiftBreak[]): IShiftBreak[] {
    const copyOfArray: IShiftBreak[] = [];
    shiftBreaks.forEach((shiftBreak) => {
      const copy: IShiftBreak = Object.assign({}, shiftBreak, {
        breakStartTime:
          shiftBreak.breakStartTime && shiftBreak.breakStartTime.isValid()
            ? shiftBreak.breakStartTime.toJSON()
            : undefined,
        breakEndTime:
          shiftBreak.breakEndTime && shiftBreak.breakEndTime.isValid()
            ? shiftBreak.breakEndTime.toJSON()
            : undefined,
      });
      copyOfArray.push(copy);
    });

    return copyOfArray;
  }
}
