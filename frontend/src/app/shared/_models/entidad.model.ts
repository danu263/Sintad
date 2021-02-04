import {Auditable} from '../_dto/auditable.model';
import {Deserializable} from '../_dto/deserializable.model';
import {Estado} from '../_dto/estado.model';

export class Entidad extends Estado implements Deserializable {

  id: number;
  idDoc: number;
  nroDoc: string;
  razonSocial: string;
  nombreComercial: string;
  idContribuyente: number;
  direccion: string;
  telefono: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
