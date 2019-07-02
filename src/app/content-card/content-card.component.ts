import { Component, Input, EventEmitter, Output } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';

/**
 * One of the main components.
 * 
 * Every non-persistent component gets rendered in a `ContentCardComponent`.
 * 
 * Observes screen size for the ability to switch views dynamically.
 */
@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent {
  @Input('title') title: string;
  @Input('fabButton') fabButton: boolean = false; 
  @Output() fabButtonOnClick: EventEmitter<any> = new EventEmitter();
  
  /** Based on the screen size, switch from standard to one column per row */
  cards = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    // TODO: Consider multiple card layouts.
    map(({ matches }) => {
      return [
        { title: 'Card 1', cols: 2, rows: 2 }
      ];
    })
  );

  constructor(private breakpointObserver: BreakpointObserver) {}

  handleFabButtonOnClick() {
    this.fabButtonOnClick.emit({}); // TODO
  }

}
