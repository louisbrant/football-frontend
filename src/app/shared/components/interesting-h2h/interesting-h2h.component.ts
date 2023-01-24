import { Component, OnInit } from '@angular/core';
import { H2hService } from '../../services/h2h.service';
import { Observable } from 'rxjs';
import { H2hInterface } from '../../interfaces/h2h.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-interesting-h2h',
  templateUrl: './interesting-h2h.component.html',
  styleUrls: ['./interesting-h2h.component.scss'],
})
export class InterestingH2hComponent implements OnInit {
  public interesting$: Observable<H2hInterface[]>;

  constructor(private readonly h2hService: H2hService, private router: Router) {
    this.interesting$ = this.h2hService.interestingData$();
  }

  ngOnInit(): void {
    this.h2hService.getH2hInterestingData();
  }

  navigateToTeamPage(teamName: string) {
    this.router
      .navigateByUrl('/', { skipLocationChange: true })
      .then(() => this.router.navigate(['team', teamName]));
  }
}
