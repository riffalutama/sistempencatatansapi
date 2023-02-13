export interface peternakRecord {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
}

export class peternakViewRecord {
  peternakId = '';
  firstName = '';
  lastName = '';
  speciality = '';
  role = '';

  constructor(readonly peternakRecord: peternakRecord) {
    this.peternakId = peternakRecord.id;
    this.firstName = peternakRecord.firstName;
    this.lastName = peternakRecord.lastName;
    this.role = peternakRecord.role;
  }
}
