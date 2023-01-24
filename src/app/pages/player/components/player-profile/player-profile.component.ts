import { Component, OnInit } from '@angular/core';
import {GeneralInfo} from "../../../../shared/interfaces/player.interface";
import {PlayerService} from "../../../../shared/services/player.service";

@Component({
  selector: 'app-player-profile',
  templateUrl: './player-profile.component.html',
  styleUrls: ['./player-profile.component.scss']
})
export class PlayerProfileComponent implements OnInit {

  player!: GeneralInfo;
  constructor(
    private readonly playerService: PlayerService
  ) { }

  ngOnInit(): void {
    this.player = this.playerService.player;
  }

}
