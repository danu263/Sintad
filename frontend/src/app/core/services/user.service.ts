import { Injectable } from '@angular/core';
import {DataService} from '../common/data.service';
import {User} from '../../shared/_models/user.model';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

const uri = `/model/user`;

@Injectable({
  providedIn: 'root'
})
export class UserService extends DataService<User>{
  apiCurrent = `/model/user/me`;

  constructor(http: HttpClient) {
    super(uri, http);
  }

  getCurrent() {
    return this.http.get<User>(this.buildPath(this.apiCurrent));
  }

  getUsers() {
    return this.getAll();
  }
}
