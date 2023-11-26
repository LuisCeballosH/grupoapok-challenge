import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'node',
    loadChildren: () =>
      import('./pages/node/node.routes').then((m) => m.nodeRoutes),
  },
  {
    path: '',
    redirectTo: 'node',
    pathMatch: 'full',
  },
];
