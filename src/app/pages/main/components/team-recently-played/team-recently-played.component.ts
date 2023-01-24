import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-team-recently-played',
  templateUrl: './team-recently-played.component.html',
  styleUrls: ['./team-recently-played.component.scss']
})
export class TeamRecentlyPlayedComponent implements OnInit {
  list = [
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'H',
      score: '2-1'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'H',
      score: '2-1'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'H',
      score: '2-2'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'A',
      score: '2-1'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'H',
      score: '2-1'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'H',
      score: '2-4'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'A',
      score: '2-1'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'A',
      score: '2-2'
    },
    {
      teamEmblem: 'rm-emblem-small.png',
      teamName: 'Real Madrid',
      leagueEmblem: 'la-league.png',
      location: 'H',
      score: '0-1'
    },
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
