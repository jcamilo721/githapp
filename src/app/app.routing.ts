import { ModuleWithProviders } from '@angular/core';
import { Router, RouterModule, Routes} from '@angular/router';
import { UserListComponent } from './components/user-list.component';
import { UserDetailComponent } from './components/user-detail.component';



const appRoutes: Routes = [
  {path: 'users', component: UserListComponent},
  {path: 'users/:login', component: UserDetailComponent},
  {path: '**', component: UserListComponent},
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
