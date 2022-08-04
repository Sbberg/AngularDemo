import { Component, OnInit } from '@angular/core';
import { HeroService } from 'src/app/services/hero.service';
import { MessageService } from 'src/app/services/message.service';
import { Hero } from './hero';
import { HEROES } from './mock-heroes';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[] = [];

  // selectedHero?:Hero;   //the ? means optional
  // onSelect(hero: Hero): void {
  //   this.selectedHero = hero;
  //   this.messageService.add(`Heroes Component: Selected hero id= ${hero.id}`)
  // }    COMMENTED OUT BECAUSE WE NO LONGER NEED THIS VARIABLE OR METHOD BECAUSE WE INTRODUCED ROUTING

  //the constructor of a componenet gets executed first. if we need any dependencies, the constructor is the best place to inject them
  constructor(private heroService: HeroService, private messageService: MessageService) { }

  //ngOnInit() - called once to initialize the component and set the input properties
  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void{
    this.heroService.getHeroes().subscribe(heroList => this.heroes = heroList);
  }

  //HERE WE ARE GOING TO ADD A NEW HERO
  add(name: string): void{
    name = name.trim();

    if(!name){return;}
    this.heroService.addHero({name} as Hero).subscribe(hero => this.heroes.push(hero))
  }

  //HERE WE ARE GOING TO DELETE A HERO
  delete(hero: Hero): void{
    this.heroes = this.heroes.filter(h => h !== hero); 
    this.heroService.deleteHero(hero.id).subscribe();   //deletes from database
  }
  
}
