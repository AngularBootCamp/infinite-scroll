import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { WhenVisibleDirective } from './when-visible.directive';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    WhenVisibleDirective
  ],
  imports: [BrowserModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
