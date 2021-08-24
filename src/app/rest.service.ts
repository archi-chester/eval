import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {Button1} from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor() { }

  // @ts-ignore
  public getButton(): Observable<Button1[]> {
    const obj: Button1[] = [{
      name: 'text1',
      func1: 'test1'
    },
    {
      name: 'text2',
      func1: 'test2'
    }]
    ;

    return of(obj);
  }
}
