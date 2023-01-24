import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit, OnDestroy {
  isShowMenu: boolean = true;
  public elasticSearch: any[] = [];
  protected unSubscribe: Subject<void> = new Subject<void>();


  @ViewChild('searchInput', { read: ElementRef }) searchInput!: ElementRef;

  ngOnInit(): void {
  }

  searchProfilesfooter(str: string) {
  }

  focusToSearch() {
    this.searchInput.nativeElement.children[0].children[0].children[0].focus()
  }

  showMenu() {
    this.isShowMenu = !this.isShowMenu
  }

  counter = 0
  tourNames = [
    'Noventi Open - Halle',
    'Dubai Duty Free Tennis Championships - Dubai',
    'Rio De Janeiro Challenger',
    'San Diego Open - San Diego',
    'Cordoba Open - Cordoba'
  ]
  nextTournamentNav() {
  }

  navigation() {
    window.location.href = `/soccer/matches`
    //this.router.navigate([$event, 'matches'])
  }

  clearSearchResult(e: Event) {
    this.elasticSearch = [];
  }

  ngOnDestroy(): void {
    this.unSubscribe.next();
    this.unSubscribe.complete();
  }
}
