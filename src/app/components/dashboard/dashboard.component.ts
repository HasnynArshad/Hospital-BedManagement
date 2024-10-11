import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Department } from '../../interfaces/department.interface';
import { BedService } from '../../services/bed.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  departments: Department[] = [];
  isLoading: boolean = true;
  error: string = '';


  // Overall Summary Properties
  totalBeds: number = 0;
  totalOccupiedBeds: number = 0;
  totalDischargeRequests: number = 0;
  totalAvailableBeds: number = 0;

  constructor(private bedService: BedService) { }
  ngOnInit(): void {
    this.fetchBedStatus();
  }

  fetchBedStatus(): void {
    this.bedService.getBedStatus().subscribe({
      next: (departments: Department[]) => {
        this.departments = departments;
        this.isLoading = false;
        this.calculateOverallSummary();
      },
      error: (error: any) => {
        console.log(error.message);
        this.error = 'Failed to load bed status';
        this.isLoading = false;
      }
    })
  }

  calculateOverallSummary(): void {
    this.totalBeds = this.departments.reduce((sum, dept) => sum + dept.totalBeds, 0);
    this.totalOccupiedBeds = this.departments.reduce((sum, dept) => sum + dept.occupiedBeds, 0);
    this.totalDischargeRequests = this.departments.reduce((sum, dept) => sum + dept.dischargeRequests, 0);
    this.totalAvailableBeds = this.departments.reduce((sum, dept) => sum + dept.availableBeds, 0);
  }

  getBedStatuses(department: Department): string[] {
    const statuses: string[] = [];

    for (let i = 0; i < department.totalBeds; i++) {
      if (i < department.dischargeRequests) {
        statuses.push('discharge');
      } else if (i < department.occupiedBeds) {
        statuses.push('occupied');
      } else {
        statuses.push('available');
      }
    }

    return statuses;
  }
}
