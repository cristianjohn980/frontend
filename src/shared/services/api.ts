import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Api {
  apiNode = (window as any).__env?.API_URL || 'http://localhost:3000';

  constructor(private httpClient: HttpClient) {}

  getStore(vData: any) {
    return this.httpClient.post(this.apiNode + '/store/get', vData);
  }

  addStore(vData: any) {
    return this.httpClient.post(this.apiNode + '/store/add', vData);
  }

  editStore(vData: any) {
    return this.httpClient.post(this.apiNode + '/store/edit', vData);
  }

  deleteStore(vData: any) {
    return this.httpClient.post(this.apiNode + '/store/delete', vData);
  }
}
