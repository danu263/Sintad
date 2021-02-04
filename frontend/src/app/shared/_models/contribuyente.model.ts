import {Auditable} from '../_dto/auditable.model';
import {Deserializable} from '../_dto/deserializable.model';
import {Estado} from '../_dto/estado.model';

export class Contribuyente extends Estado implements Deserializable {

  id: number;
  nombre: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
