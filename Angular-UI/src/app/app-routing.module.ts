import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersComponent } from './users/users.component';
import { UserComponent } from './users/user/user.component';
import { UserFormComponent } from './users/user-form/user-form.component';


const routes: Routes = [
  { path: 'users', component: UsersComponent },
  { path: 'user/:id',  component: UserComponent},
  { path: 'edit/user/:id',  component: UserFormComponent, data : {action : 'Edit user'}},
  { path: 'create-user',  component: UserFormComponent, data : {action :'Create new User'}},
  { path: '',
    redirectTo: '/users',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ initialNavigation: 'enabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
