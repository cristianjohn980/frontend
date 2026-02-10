import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiNode = 'http://localhost:3000'; // sesuaikan kalau beda

  constructor(private httpClient: HttpClient) {}

  getStore(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/get', vData);
}

addStore(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/add', vData);
}

editStore(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/edit', vData);
}

deleteStore(vData: any) {
  return this.httpClient.post(this.apiNode + '/catalog/delete', vData);
}

}
