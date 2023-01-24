import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {FootballMatchesComponent} from "./football-matches.component";
import { UpcomingMatchesComponent } from './upcoming-matches/upcoming-matches.component';
import {SharedModule} from "../../shared/shared.module";
import { HomeUpcomingMatchComponent } from './home-upcoming-match/home-upcoming-match.component';


const routes: Routes = [
  {
    path: '',
    component: FootballMatchesComponent,
    pathMatch: 'full'
  },
];


@NgModule({
  declarations: [
    FootballMatchesComponent,
    UpcomingMatchesComponent,
    HomeUpcomingMatchComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes),
  ]
})
export class FootballMatchesModule { }
