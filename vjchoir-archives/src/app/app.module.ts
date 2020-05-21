import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing/app-routing.module';

import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BatchesComponent } from './pages/batches/batches.component';
import { SovComponent } from './pages/sov/sov.component';
import { ListenComponent } from './pages/listen/listen.component';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { MiscComponent } from './pages/misc/misc.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    AboutComponent,
    BatchesComponent,
    SovComponent,
    ListenComponent,
    ContributeComponent,
    MiscComponent
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
