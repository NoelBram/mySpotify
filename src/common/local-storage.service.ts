import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  private subject$ = new Subject<any>();

  setItem(key: string, value: string) {
    localStorage.setItem(key, value);
    this.subject$.next({ action: 'set', key });
  }

  removeItem(key: string) {
    localStorage.removeItem(key);
    this.subject$.next({ action: 'remove', key });
  }

  localStorageChanging(): Observable<any> {
    return this.subject$.asObservable();
  }
}