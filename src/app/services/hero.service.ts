import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Hero } from '../components/heroes/hero';
import { HEROES } from '../components/heroes/mock-heroes';
import { MessageService } from './message.service';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  //this method has a synchronous signature: this implies that the heroService can fetch heroes synchronously. however, this approach won't 
  // work in a real application. in a real application we want to fetch data asynchronously
  // getHeroes(): Hero[]{
  //   return HEROES;}

  //this is the URL that is generated from Angular that leads us to our resource in our in-memory-data-service. 
  // when building your apps this is where you'd add your http://localhost:8080/(_)
  private serverURL = 'api/heroes';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
  }

  constructor(private messageService: MessageService, private http: HttpClient) { }
  
  getHeroes(): Observable<Hero[]> {
    // const heroes = of(HEROES);
    // this.messageService.add('Hero Service: fetched all heroes')
    // return heroes;
    // COMMENTED OUT BECAUSE WE'RE NOT LOOKING AT THE MOCK HEROES, INSTEAD WE'RE LOOKING TO THE DATABASE

    // to catch errors you 'pipe' the observable result from http.get() through the rxjs catchError operator
    return this.http.get<Hero[]>(this.serverURL) 
    .pipe(
      //with the tap() operators we can see the values and do things with the values but can't access them directly
      tap(_ => this.log("fetched all heroes")),
      catchError(this.handleError<Hero[]>('getHeroes', []))
      //the catchError operator intercepts an Observable that failed, then passes the error to the handling 
      // function (handleError()). the handleError() reports the error and then returns a result so that the app keeps working
    )
  }

  getHero(id:Number): Observable<Hero> {

    const url = `${this.serverURL}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(
      tap(_ => this.log(`fetched hero with id: ${id}`)),
      catchError(this.handleError<Hero>(`getHero id=${id}`))
    )
  }

  //ALL POST METHODS

  addHero(hero: Hero): Observable<Hero>{
    return this.http.post<Hero>(this.serverURL, hero, this.httpOptions)
    .pipe(
      tap((newHero: Hero) => this.log(`added hero with id: ${newHero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    )
  }

  //UPDATE (PUT) METHOD
  updateHero(hero: Hero): Observable<any>{
    return this.http.put(this.serverURL, hero, this.httpOptions)
    .pipe(
      tap(_ => this.log(`updated hero with id: ${hero.id}`)),
      catchError(this.handleError<any>('updateHero'))
    )
  }

  //DELETE METHOD
  deleteHero(id: number): Observable<Hero>{
    const url = `${this.serverURL}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions)
    .pipe(
      tap(_ => this.log(`deleted hero with id: ${id}`)),
      catchError(this.handleError<Hero>('deleteHero'))
    );
  }

  private handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> => {

      console.error(error);
      this.log(`${operation} failed: ${error.name}`)
      return of(result as T);
    }
  }
  
  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }
}
