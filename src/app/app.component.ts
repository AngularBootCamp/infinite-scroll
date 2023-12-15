import { Component } from '@angular/core';

import { EmployeesComponent } from './employees/employees.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: true,
  imports: [EmployeesComponent]
})
export class AppComponent {}
