import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { url } from '../util/url.data';
import {TokenDto} from '../../shared/_models/token-dto.model';
import {Observable} from 'rxjs';

const headers = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'/*,
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type'*/
  }),
};

@Injectable({
  providedIn: 'root'
})
export class OauthService {
  oauthURL = url + '/oauth/';

  constructor(private httpClient: HttpClient) { }

  public google(tokenDto: TokenDto): Observable<TokenDto> {
    return this.httpClient.post<TokenDto>(
      this.oauthURL + 'google',
      tokenDto,
      headers
    );
  }
}
