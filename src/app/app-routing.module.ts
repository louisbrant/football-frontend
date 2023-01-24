import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from "./pages/not-found/not-found.component";

const routes: Routes = [
  {
    path: '',
    component: NotFoundComponent,
    pathMatch: 'full'
  },
  {
    path: 'team/:teamName',
    loadChildren: () => import('./pages/team/team.module')
      .then(m => m.TeamModule),
    pathMatch: 'full'
  },
  {
    path: 'player/:playerName',
    loadChildren: () => import('./pages/player/player.module')
      .then(m => m.PlayerModule)
  },
  {
    path: 'league/:leagueName',
    loadChildren: () => import('./pages/league/league.module')
      .then(m => m.LeagueModule)
  },
  {
    path: 'live/:fixtureId',
    loadChildren: () => import('./pages/match-live/match-live.module')
      .then(m => m.MatchLiveModule)
  },
  {
    path: 'main',
    loadChildren: () => import('./pages/main/main.module')
      .then(m => m.MainModule)
  },
  {
    path: 'h2h/:firstTeamId/:secondTeamId',
    loadChildren: () => import('./pages/h2h/h2h.module')
      .then(m => m.H2hModule)
  },
  {
    path: 'live/:firstTeamId/:secondTeamId',
    loadChildren: () => import('./pages/live/live.module')
      .then(m => m.H2hModule)
  },
  {
    path: 'matches',
    loadChildren: () => import('./pages/football-matches/football-matches.module')
      .then(m => m.FootballMatchesModule)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
