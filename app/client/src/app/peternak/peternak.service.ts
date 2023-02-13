import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class peternakService {

  private peternakURL = 'http://localhost:3001/peternak';

  constructor(private http: HttpClient) { }

  public createpeternak(data: any): Observable<any> {
    return this.http.post(this.peternakURL + '/register', data);
  }

  public getpeternaksByHospitalId(hospitalId: number): Observable<any> {
    return this.http.get(this.peternakURL + `/${hospitalId}/_all`);
  }

  public getpeternakByHospitalId(hospitalId: string, docId: any): Observable<any> {
    return this.http.get(this.peternakURL + `/${hospitalId}/${docId}`);
  }
}
