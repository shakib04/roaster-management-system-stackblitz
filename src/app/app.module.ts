import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbDate, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing/app-routing.module';


import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ShiftAssignmentComponent } from './shift-assignment/shift-assignment.component';
import { ShiftAssignmentServiceService } from './shift-assignment/shift-assignment.service';
import { HttpClientModule } from '@angular/common/http';
import { ShiftCreationUiComponent } from './shift-creation-ui/shift-creation-ui.component';

@NgModule({
  imports:      [ BrowserModule, FormsModule, NgSelectModule, NgbModule,ReactiveFormsModule, HttpClientModule, AppRoutingModule  ],
  declarations: [ AppComponent, HelloComponent, ShiftAssignmentComponent, ShiftCreationUiComponent ],
  providers: [ShiftAssignmentServiceService],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
