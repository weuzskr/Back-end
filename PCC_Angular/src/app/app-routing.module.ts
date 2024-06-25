import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from './admin/shared/components/not-found/not-found.component';
import { MinistreComponent } from './admin/modules/ministre/ministre.component';
import { ChancelierComponent } from './admin/modules/chancelier/chancelier.component';
import { LoginComponent } from './admin/login/login.component';
import { AuthGuardConsul, AuthGuardMinistre } from './services/guard';
import { DefaultComponent } from './admin/layout/default/default.component';

const routes: Routes = [
  { path: '', component: LoginComponent, title: 'Login' },
  {
    path: 'ministre', component: DefaultComponent, children:
      [{
        path: '',
        component: MinistreComponent,
        title: 'Ministre'
        // canActivate: [AuthGuardMinistre]
      }]
  },
  {
    path: 'chancelier', component: DefaultComponent, children: [{
      path: '',
      component: ChancelierComponent,
      title: 'Chancelier'
      // canActivate: [AuthGuardConsul]
    }]
  },
  { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
