import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  httpOptions:any;

  constructor() { }
  httpoptions={
    headers: new HttpHeaders({ 'Contact-Type':'application/json'})
  }
}
