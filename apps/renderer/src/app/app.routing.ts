import { Route, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

export const routes: Route[] = [
  {
    path: '',
    loadChildren: () => import('@venobo/player').then(m => m.PlayerModule),
  },
];

export const AppRouting: ModuleWithProviders =
  RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'top',
    anchorScrolling: 'enabled',
    initialNavigation: 'enabled',
    paramsInheritanceStrategy: 'always',
  });
