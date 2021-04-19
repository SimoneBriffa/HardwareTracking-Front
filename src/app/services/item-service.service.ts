import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../environment/environment';
import { Item } from '../model/item';
import { Loan } from '../model/loan';


@Injectable({
  providedIn: 'root'
})
export class ItemServiceService {

  host: string = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public add(item: FormData): Observable<Item[]>{
    return this.http.post<Item[]>(`${this.host}/item/save`, item);
  }

  public newLoan(newLoan: FormData): Observable<Loan>{
    return this.http.post<Loan>(`${this.host}/loan/save`, newLoan);
  }

  public getAll(): Observable<Item[]>{
    return this.http.get<Item[]>(`${this.host}/item/getAll`);
  }

  public delete(id: number): Observable<any>{
    return this.http.delete(`${this.host}/item/delete/${id}`);
  }

  public track(): Observable<Loan[]>{
    return this.http.get<Loan[]>(`${this.host}/loan/track`);
  }

  public downloadAndReturn(info: FormData){
    return this.http.post(`${this.host}/loan/downloadAndReturn`, info);
  }

  public downloadHistory(){
    return this.http.get(`${this.host}/loan/downloadHistory`);
  }

  public generalHistory(): Observable<Loan[]>{
    return this.http.get<Loan[]>(`${this.host}/loan/generalHistory`);
  }

  public itemHistory(id: number): Observable<any>{
    return this.http.get<any>(`${this.host}/loan/downloadItemHistory/${id}`);
  }


}
