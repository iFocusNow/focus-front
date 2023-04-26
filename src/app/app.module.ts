import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';

// Material-UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { AccountComponent } from './components/account/account.component';
import { MatIconModule } from '@angular/material/icon';
import { SidenavElementComponent } from './components/sidenav-element/sidenav-element.component';

@NgModule({
  declarations: [AppComponent, LayoutComponent, AccountComponent, SidenavElementComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    // Material
    MatSidenavModule,
    MatIconModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
