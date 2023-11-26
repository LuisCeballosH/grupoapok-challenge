import { Routes } from '@angular/router';
import { NodeListPage } from './views/node-list/node-list.page';
import { NodePage } from './views/node/node.page';
import { CreatePage } from './views/create/create.page';

export const nodeRoutes: Routes = [
  {
    path: '',
    component: NodeListPage,
  },
  {
    path: 'create',
    component: CreatePage,
  },
  {
    path: ':id',
    component: NodePage,
  },
];
