import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HeroService } from 'src/app/services/hero.service';
import { Hero } from '../heroes/hero';
import { Location } from '@angular/common';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  //having the @Input() decorator on this component signifies that this is a child component that can receive data from a parent component
  hero: Hero | undefined;

  constructor(private route: ActivatedRoute, 
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void{
    //route.snapshot is a static image of the route info soon after the component is created
    //paramMap is a dictionary of route param values extracted from the URL - 'id' key returns the id of the hero to fetch

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.heroService.getHero(id).subscribe(hero => this.hero = hero);
  }

  goBack(): void{
    // this will navigate one-step backwards in the browser history
    this.location.back();
  }

}
