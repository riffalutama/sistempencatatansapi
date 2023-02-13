import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, Subscription } from 'rxjs';

import { peternakService } from '../peternak.service';
import { peternakRecord, peternakViewRecord } from '../peternak';
import { DisplayVal } from '../../patient/patient';
import { PatientService } from '../../patient/patient.service';

@Component({
  selector: 'app-peternak-list-for-patient',
  templateUrl: './peternak-list-for-patient.component.html',
  styleUrls: ['./peternak-list-for-patient.component.scss']
})
export class peternakListForPatientComponent implements OnInit, OnDestroy {
  public patientID: any;
  public peternakRecords: Array<peternakViewRecord> = [];
  public permissions = [];
  public grantObs$?: Observable<any>;
  public revokeObs$?: Observable<any>;
  private allSubs = new Subscription();
  public headerNames = [
    new DisplayVal(peternakViewRecord.prototype.peternakId, 'peternak Id'),
    new DisplayVal(peternakViewRecord.prototype.firstName, 'First Name'),
    new DisplayVal(peternakViewRecord.prototype.lastName, 'Last Name')
  ];

  constructor(
    private readonly route: ActivatedRoute,
    private readonly peternakService: peternakService,
    private readonly patientService: PatientService
  ) { }

  ngOnInit(): void {
    this.allSubs.add(
      this.route.params.subscribe((params: Params) => {
        this.patientID = params.patientId;
        this.refresh();
      })
    );
  }

  ngOnDestroy(): void {
    this.allSubs.unsubscribe();
  }

  public refresh(): void {
    this.peternakRecords = [];
    this.allSubs.add(
      this.patientService.getPatientByKey(this.patientID).subscribe(x => {
        this.permissions = x.permissionGranted;
        this.fetchpeternakData();
      })
    );
  }

  public fetchpeternakData(): void {
    this.allSubs.add(
      this.peternakService.getpeternaksByHospitalId(1).subscribe(x => {
        const data = x as Array<peternakRecord>;
        data.map(y => this.peternakRecords.push(new peternakViewRecord(y)));
      })
    );
    this.allSubs.add(
      this.peternakService.getpeternaksByHospitalId(2).subscribe(x => {
        const data = x as Array<peternakRecord>;
        data.map(y => this.peternakRecords.push(new peternakViewRecord(y)));
      })
    );
    this.allSubs.add(
      this.peternakService.getpeternaksByHospitalId(3).subscribe(x => {
        const data = x as Array<peternakRecord>;
        data.map(y => this.peternakRecords.push(new peternakViewRecord(y)));
      })
    );
  }

  public grant(peternakId: string): void {
    this.allSubs.add(
      this.patientService.grantAccessTopeternak(this.patientID, peternakId).subscribe(x => {
        console.log(x);
        this.refresh();
      })
    );
  }

  public revoke(peternakId: string): void {
    this.allSubs.add(
      this.patientService.revokeAccessFrompeternak(this.patientID, peternakId).subscribe(x => {
        console.log(x);
        this.refresh();
      })
    );
  }

  public ispeternakPresent(peternakId: string): boolean {
    // @ts-ignore
    return this.permissions.includes(peternakId);
  }
}
