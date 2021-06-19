import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Societe } from '../classes/societe';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})

export class SocieteService {

  
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  private SocietesUrl = 'http://localhost:8083/api';
  constructor(private http: HttpClient) { }
  getSocietes (): Observable<Societe[]> {
    return this.http.get<Societe[]>(this.SocietesUrl +'/s').pipe(
      tap(_ => console.log('fetched Societe')),
      catchError(this.handleError<Societe[]>('getSocietes', []))
    );
  }
  getUserGrade(grade:String){
    return this.http.get(this.SocietesUrl+'/'+grade)
  }

  create(societe: Societe): Observable<any> {
    return this.http.post<Societe>(this.SocietesUrl + '/', societe, httpOptions).pipe(
      tap((newUser: Societe) => console.log(`added societe w/ id=${newUser.id}`)),
      catchError(this.handleError<Societe>('create'))
    );
  }
  delete(societe: Societe | number): Observable<Societe> {
    const id = typeof societe === 'number' ? societe : societe.id;
    const url = `${this.SocietesUrl}/${id}`;

    return this.http.delete<Societe>(url, httpOptions).pipe(
      tap(_ => console.log(`deleted Societe id=${id}`)),
      catchError(this.handleError<Societe>('delete'))
    );
  }

  deleteSociete(_id: string) {
    return this.http.delete(this.SocietesUrl + '/societes'+ `/${_id}`);
  }
  updateSociete(emp) {
    return this.http.put(this.SocietesUrl + 'societes' + `/${emp.id}`, emp);
  }
 
}