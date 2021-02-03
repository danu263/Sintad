import {Deserializable} from '../_dto/deserializable.model';

export class Role implements Deserializable{

  idRole: number;
  name: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
