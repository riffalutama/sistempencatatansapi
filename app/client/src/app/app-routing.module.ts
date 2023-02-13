import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { PatientComponent } from './patient/patient.component';
import { peternakComponent } from './peternak/peternak.component';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './core/auth/auth.guard';
import { PatientEditComponent } from './patient/patient-register/patient-edit.component';
import { peternakRegisterComponent } from './peternak/peternak-register/peternak-register.component';
import { PatientHistoryComponent } from './patient/patient-history/patient-history.component';
import { PatientDetailsMedicalEditComponent } from './patient/patient-details-medical-edit/patient-details-medical-edit.component';
import { PatientDetailsPersonalEditComponent } from './patient/patient-details-personal-edit/patient-details-personal-edit.component';
import { peternakListForPatientComponent } from './peternak/peternak-list-for-patient/peternak-list-for-patient.component';
import { PatientListForpeternakComponent } from './peternak/patient-list-for-peternak/patient-list-for-peternak.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'patient/edit/:self',
    component: PatientEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patient/:patientId/details/personal/edit',
    component: PatientDetailsPersonalEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patient/:patientId/details/medical/edit',
    component: PatientDetailsMedicalEditComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patient/:patientId/peternak/list',
    component: peternakListForPatientComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patient/:patientId',
    component: PatientComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'patient/:patientId/history',
    component: PatientHistoryComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'peternak/register',
    component: peternakRegisterComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'peternak/:peternakId',
    component: peternakComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'peternak/:peternakId/patients',
    component: PatientListForpeternakComponent,
    canActivate: [ AuthGuard ]
  },
  {
    path: 'admin/:adminId',
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
