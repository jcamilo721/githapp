import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { GithubService } from './services/github.service';
import { UserListComponent } from './components/user-list.component';
import { UserDetailComponent } from './components/user-detail.component';


@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserDetailComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    routing,
    RouterModule
  ],
  providers: [GithubService, appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
