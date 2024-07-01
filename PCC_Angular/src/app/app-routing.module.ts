import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './admin/shared/components/not-found/not-found.component';
import { MinistreComponent } from './admin/modules/ministre/ministre.component';
import { ChancelierComponent } from './admin/modules/chancelier/chancelier.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuardConsul, AuthGuardMinistre } from './services/guard';
import { RegionComponent } from './admin/modules/region/region.component';
import { DepartemntComponent } from './admin/modules/departement/departement.component';
import { ProfessionComponent } from './admin/modules/profession/profession.component';
import { ConsulatComponent } from './admin/modules/consulat/consulat.component';
import { JuridictionComponent } from './admin/modules/juridiction/juridiction.component';
import { posteComponent } from './admin/modules/poste/poste.component';
import { AdministrateurComponent } from './admin/modules/administrateur/administrateur.component';


const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  {
    path: 'ministre', component: MinistreComponent,
    title: 'Ministre',
    canActivate: [AuthGuardMinistre]
  },
  {
    path: 'region', component: RegionComponent,
    title: 'Region',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'departement', component: DepartemntComponent,
    title: 'Departement',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'profession', component: ProfessionComponent,
    title: 'Profession',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'consulat', component: ConsulatComponent,
    title: 'Consulat',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'juridiction', component: JuridictionComponent,
    title: 'Juriction',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'poste', component: posteComponent,
    title: 'Poste',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'admins', component: AdministrateurComponent,
    title: 'Admins',
    canActivate: [AuthGuardMinistre]
  },
  {
    path: 'consulat', component: ConsulatComponent,
    title: 'Consulat',
    // canActivate: [AuthGuardMinistre || AuthGuardConsul]
  },
  {
    path: 'chancelier', component: ChancelierComponent,
    title: 'Chancelier',
    canActivate: [AuthGuardConsul]
  },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
