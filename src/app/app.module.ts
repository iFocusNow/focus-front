import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { ChildComponent } from './components/child/child.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DeviceSelectorComponent } from './components/device-selector/device-selector.component';

// Material-UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountComponent } from './components/account/account.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavElementComponent } from './components/sidenav-element/sidenav-element.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AccountComponent,
    SidenavElementComponent,
    ChildComponent,
    LoginComponent,
    RegisterComponent,
    DeviceSelectorComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Material
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
