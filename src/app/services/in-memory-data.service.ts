import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable } from 'rxjs';
import { Hero } from '../components/heroes/hero';

@Injectable({
  providedIn: 'root'
})
export class InMemoryDataService implements InMemoryDbService {

  //this method is where we are now looking to get our heroes (NOT mock-heroes-ts)
  createDb() {
      const heroes = [
        {id: 12, name:'Dr.Nice'},
        {id: 13, name:'Bombasto'},
        {id: 14, name:'Celebritas'},
        {id: 15, name:'RubberMan'},
        {id: 16, name:'Dynama'},
        {id: 17, name:'Dr.IQ'},
        {id: 18, name:'Magma'},
        {id: 19, name:'Magneta'},
        {id: 20, name:'Tornado'},
      ];
      return {heroes};
  }

  //this method exists in InMemoryDbService that's coming from 'angular-in-memory-web-api'. this implementation that we have given it ovverrides the already given implementation 
  genId(heroes: Hero[]): number{
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 11;   //here we are generating an ID using the last ID and adding 1
  }

  constructor() { }
}
