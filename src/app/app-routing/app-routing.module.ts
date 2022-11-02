import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes, RouterModule } from '@angular/router';
import { ShiftAssignmentComponent } from '../shift-assignment/shift-assignment.component';
import { ShiftCreationUiComponent } from '../shift-creation-ui/shift-creation-ui.component';

const routes: Routes = [
  { path: '', component: ShiftCreationUiComponent },
  { path: 'shift-assignment', component: ShiftAssignmentComponent },
  { path: 'shift-creation', component: ShiftCreationUiComponent },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class AppRoutingModule { }