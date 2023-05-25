import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './components/layout/layout.component';
import { ChildComponent } from './components/child/child.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AppsTableComponent } from './components/apps-table/apps-table.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { AddAppDialogComponent } from './components/add-app-dialog/add-app-dialog.component';
import { AccountComponent } from './components/account/account.component';
import { HelpComponent } from './components/help/help.component';
import { SidenavElementComponent } from './components/sidenav-element/sidenav-element.component';

// Material-UI
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AddLinkDialogComponent } from './components/add-link-dialog/add-link-dialog.component';
import { EditBlockperiodComponent } from './components/edit-blockperiod/edit-blockperiod.component';
import { LinksTableComponent } from './components/links-table/links-table.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { AddChildComponent } from './components/add-child/add-child.component';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    AccountComponent,
    SidenavElementComponent,
    ChildComponent,
    LoginComponent,
    RegisterComponent,
    AppsTableComponent,
    HelpComponent,
    AddAppDialogComponent,
    AddLinkDialogComponent,
    EditBlockperiodComponent,
    LinksTableComponent,
    DeleteDialogComponent,
    AddChildComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // Material
    MatSidenavModule,
    MatIconModule,
    MatTabsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatExpansionModule,
    MatBadgeModule,
    MatCheckboxModule,
    MatStepperModule,
    MatSnackBarModule,
    MatExpansionModule,
    MatInputModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
