import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { NgbCarouselModule, NgbModalModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { PlyrModule } from 'ngx-plyr';
import { AppComponent } from './app.component';
import { SidebarComponent } from './navigation/sidebar/sidebar.component';
import { NavbarComponent } from './navigation/navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { BatchesComponent } from './pages/batches/batches.component';
import { SovComponent } from './pages/sov/sov.component';
import { ListenComponent } from './pages/listen/listen.component';
import { ContributeComponent } from './pages/contribute/contribute.component';
import { MiscComponent } from './pages/misc/misc.component';
import { NavControllerComponent } from './navigation/nav-controller/nav-controller.component';
import { SiderComponent } from './navigation/sider/sider.component';
import { AppendNamesPipe } from './pipes/append-names.pipe';
import { SafePipe } from './pipes/safe-link-pipe';
import { PlayerComponent } from './music/player/player.component';
import { FormatDurationPipe } from './pipes/format-duration.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';

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
    MiscComponent,
    NavControllerComponent,
    SiderComponent,
    PlayerComponent,
    AppendNamesPipe,
    SafePipe,
    FormatDurationPipe
  ],
  imports: [
    BrowserModule,
    FontAwesomeModule,
    AppRoutingModule,
    NgbCarouselModule,
    NgbModalModule,
    NgbDropdownModule,
    PlyrModule,
    BrowserAnimationsModule,
    DragDropModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
