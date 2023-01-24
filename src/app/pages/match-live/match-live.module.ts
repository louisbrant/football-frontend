import {NgModule} from '@angular/core';
import {SharedModule} from "../../shared/shared.module";
import {RouterModule, Routes} from "@angular/router";
import {MatchLiveComponent} from "./match-live.component";

const routes: Routes = [
    {
        path: '',
        component: MatchLiveComponent,
        pathMatch: 'full'
    },
];

@NgModule({
    declarations: [
        MatchLiveComponent,
    ],
    imports: [
        SharedModule,
        RouterModule.forChild(routes)
    ],
    providers: [],
})
export class MatchLiveModule {
}
