import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import { RoleEnum } from '../utils';
import { AuthService } from '../core/auth/auth.service';

import { peternakViewRecord } from './peternak';
import { peternakService } from './peternak.service';


@Component({
  selector: 'app-peternak',
  templateUrl: './peternak.component.html',
  styleUrls: ['./peternak.component.scss']
})
export class peternakComponent implements OnInit, OnDestroy {
  public peternakId: any;
  public peternakRecordObs?: Observable<peternakViewRecord>;
  private sub?: Subscription;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly peternakService: peternakService,
    private readonly authService: AuthService
  ) { }

  ngOnInit(): void {
    this.sub = this.route.params
      .subscribe((params: Params) => {
        this.peternakId = params.peternakId;
        this.refresh();
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public refresh(): void {
    this.peternakRecordObs = this.peternakService.getpeternakByHospitalId(this.authService.getHospitalId(), this.peternakId);
  }

  public ispeternak(): boolean {
    return this.authService.getRole() === RoleEnum.peternak;
  }
}
