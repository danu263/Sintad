import {Auditable} from '../_dto/auditable.model';
import {Deserializable} from '../_dto/deserializable.model';
import {Role} from './role.model';

export class User extends Auditable implements Deserializable{

  idUser: number;
  email: string;
  phone: number;
  dni: number;
  name: string;
  lastname: string;
  active: boolean;
  token: string;
  role: Role[];

  invitingId: number;
  // "transient"
  fullName: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
