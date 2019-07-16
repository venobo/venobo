import { Injectable } from '@angular/core';
import { Actions, ofActionSuccessful } from '@ngxs/store';
import { RouterNavigation, RouterState } from '@ngxs/router-plugin';
import { distinctUntilChanged, map, pluck } from 'rxjs/operators';
import { RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class RouteHandler {
  constructor(
    private readonly actions$: Actions,
  ) {
    this.actions$
      .pipe(
        ofActionSuccessful(RouterNavigation),
        pluck('routerState'),
        distinctUntilChanged((previous: RouterStateSnapshot, current: RouterStateSnapshot) => {
          return previous.url === current.url;
        }),
      )
      .subscribe(routerState => {
        console.log(routerState);
      });
  }
}
