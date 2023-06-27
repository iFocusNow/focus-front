import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './components/account/account.component';
import { ChildComponent } from './components/child/child.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HelpComponent } from './components/help/help.component';
import { AddChildComponent } from './components/add-child/add-child.component';
import { EditChildComponent } from './components/edit-child/edit-child.component';
import { AddDeviceComponent } from './components/add-device/add-device.component';
import { AuthGuard } from './auth.guard';
import { SessionGuard } from './session.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: AccountComponent },
      { path: 'child/:id', component: ChildComponent },
      { path: 'edit/child/:id', component: EditChildComponent },
      { path: 'add/device/:id', component: AddDeviceComponent },
      { path: 'help', component: HelpComponent },
      { path: 'add', component: AddChildComponent },
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [SessionGuard],
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [SessionGuard],
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
