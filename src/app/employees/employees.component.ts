import { Component } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import {
  concatMap,
  map,
  scan,
  shareReplay,
  startWith
} from 'rxjs/operators';

import { Employee, EmployeeService } from './employees.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent {
  doneLoading: Observable<boolean>;
  private fetchEmployees = new Subject<void>();
  employees: Observable<Employee[]>;

  constructor(private employeeService: EmployeeService) {
    const pagedResults = this.fetchEmployees.pipe(
      scan(acc => acc + 1, -1),
      concatMap(page => this.employeeService.loadEmployees(page)),
      shareReplay({ refCount: true, bufferSize: 1 })
    );

    this.employees = pagedResults.pipe(
      scan<Employee[], Employee[]>(
        (alreadyLoaded, newlyArrived) => [
          ...alreadyLoaded,
          ...newlyArrived
        ],
        []
      )
    );

    this.doneLoading = pagedResults.pipe(
      map(employees => !employees.length),
      startWith(false)
    );
  }

  loadMore() {
    this.fetchEmployees.next();
  }
}
