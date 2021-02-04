import { Injectable } from '@angular/core';
import {DataService} from '../common/data.service';
import {Entidad} from '../../shared/_models/entidad.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

const uri = '/entidad';

@Injectable()
export class EntidadService extends DataService<Entidad>{

  // URI para toda la lista de entidad
  apiUriService = '/entidad/list';

  constructor( http: HttpClient ) {
    super(uri, http);
  }

  getAllEntities(): Observable<Entidad[]> {
    return this.http
      .get<Entidad[]>(this.buildPath(this.apiUriService))
      .pipe(catchError(this.handleError));
  }
}
