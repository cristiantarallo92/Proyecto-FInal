import { Injectable } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Observable, BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})

export class RouteService {
    private currentRouteSubject: BehaviorSubject<string>;
  
    constructor(private router: Router) { /*
      this.currentRouteSubject = new BehaviorSubject<string>(this.router.url);
      this.router.events.pipe(
     filter(event => event instanceof NavigationEnd) 
      ).subscribe((event: NavigationEnd) => {
        this.currentRouteSubject.next(event.url);
      }); */
    }
  
    getCurrentRoute(): Observable<string> {
      return this.currentRouteSubject.asObservable();
    } 
  }

