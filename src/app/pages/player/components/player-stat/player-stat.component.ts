import { Component, Input } from '@angular/core';
import { PlayerService } from '../../../../shared/services/player.service';
import { switchMap, takeUntil } from 'rxjs/operators';
import { PlayerStats } from '../../../../shared/interfaces/player.interface';
import { FilterDirective } from '../../../../shared/directive/filter.directive';
import { TeamService } from '../../../../shared/services/team.service';
import { isEmptyObject } from '../../../../shared/helper/isEmptyObject';

@Component({
  selector: 'app-player-stat',
  templateUrl: './player-stat.component.html',
  styleUrls: ['./player-stat.component.scss'],
})
export class PlayerStatComponent extends FilterDirective {
  player: PlayerStats | undefined;
  @Input() title = '';

  constructor(
    private readonly playerService: PlayerService,
    protected override teamService: TeamService
  ) {
    super(teamService);
  }

  protected override getData() {
    this.subject$
      .asObservable()
      .pipe(
        switchMap(() =>
          this.playerService.getStats(
            this.playerService.player.id,
            this.curLeague,
            this.curSeason
          )
        ),
        takeUntil(this.subscription)
      )
      .subscribe(
        (res) => (this.player = isEmptyObject(res) ? undefined : res),
        () => (this.loaderState = { val: false })
      );
  }
}
