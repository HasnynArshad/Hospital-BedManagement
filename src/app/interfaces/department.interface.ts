// src/app/interfaces/department.interface.ts

// export interface Bed {
//   bedNumber: number;
//   status: 'available' | 'occupied' | 'discharge';
//   patientName?: string;
//   doctorName?: string;
//   admissionDate?: string;
// }

// export interface Department {
//   id: number;
//   name: string;
//   beds: Bed[];
//   // Optionally, you can remove totalBeds, occupiedBeds, etc., or keep them for summary
// }








// src/app/interfaces/department.interface.ts


export interface Department {
    id: number;
    name: string;
    totalBeds: number;
    occupiedBeds: number;
    dischargeRequests: number;
    availableBeds: number;
  }
  