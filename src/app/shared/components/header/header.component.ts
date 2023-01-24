import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { UnsubscribeDirective } from "../../directive/unsubscribe.directive";
import { Router } from "@angular/router";
import { takeUntil } from "rxjs/operators";
import { PlayerService } from "../../services/player.service";
import { TeamService } from "../../services/team.service";
import { SearchService } from "../../services/search.service";
import { SearchInterface } from "../../interfaces/search.interface";
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent extends UnsubscribeDirective implements OnInit {
  public searchResult?: SearchInterface[];
  searcheSubscription: any = null;

  routes: {
    value: string;
    name: string;
  }[] = [
      { name: 'Football', value: 'football' },
      { name: 'Tennis', value: 'tennis' },
    ];

  route: FormControl = new FormControl('');

  @ViewChild('searchInput', { read: ElementRef }) searchInput!: ElementRef;

  constructor(
    private router: Router,
    private readonly searchService: SearchService
  ) {
    super()
  }

  navigation(path: string): void {
    if (path == 'tennis')
      window.location.href = "http://localhost:80/tennis";
    else
      window.location.href = path;
  }

  searchData(name: string) {
    if (this.searcheSubscription != null) {
      this.searcheSubscription.unsubscribe();
    }
    this.searcheSubscription = this.searchService.search(name).subscribe(data => {
      this.searchResult = data;
    })
  }

  ngOnInit(): void {
    this.route.setValue(this.routes[0].value)
    this.route.valueChanges
      .pipe(
        takeUntil(this.subscription)
      )
      .subscribe(val => this.router.navigateByUrl(val))
  }

  clearSearchResult(e: Event) {
    this.searchResult = [];
  }

}
