import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ChancelierComponent } from '../modules/chancelier/chancelier.component';
import { MinistreComponent } from '../modules/ministre/ministre.component';
import { DefaultComponent } from './default/default.component';
import { SharedModule } from '../shared/shared.module';
import { OverviewComponent } from '../modules/overview/overview.component';



@NgModule({
    declarations: [
        DefaultComponent,
        MinistreComponent,
        ChancelierComponent,
        OverviewComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        RouterModule
    ]
})
export class DefaultModule { }