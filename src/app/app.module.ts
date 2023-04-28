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
import { AppsTableComponent } from './components/apps-table/apps-table.component';
import { HttpClientModule } from '@angular/common/http';

// Material-UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountComponent } from './components/account/account.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavElementComponent } from './components/sidenav-element/sidenav-element.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

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
    AppsTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Material
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
