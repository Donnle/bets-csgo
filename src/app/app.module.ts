import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {BetsPageComponent} from './pages/bets-page/bets-page.component';
import {MatchesComponent} from './components/matches/matches.component';
import {MatchComponent} from './components/matches/match/match.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BetsPageComponent,
    MatchesComponent,
    MatchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
