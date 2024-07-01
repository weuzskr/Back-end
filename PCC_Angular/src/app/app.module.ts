import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/interceptor';
import { MinistreComponent } from './admin/modules/ministre/ministre.component';
import { ChancelierComponent } from './admin/modules/chancelier/chancelier.component';
import { SharedModule } from './admin/shared/shared.module';
import { RouterModule } from '@angular/router';
import { RegionComponent } from './admin/modules/region/region.component';
import { SearchPipe } from './search.pipe';
import { DepartemntComponent } from './admin/modules/departement/departement.component';
import { ProfessionComponent } from './admin/modules/profession/profession.component';
import { ConsulatComponent } from './admin/modules/consulat/consulat.component';
import { JuridictionComponent } from './admin/modules/juridiction/juridiction.component';
import { posteComponent } from './admin/modules/poste/poste.component';
import { AdministrateurComponent } from './admin/modules/administrateur/administrateur.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MinistreComponent,
    ChancelierComponent,
    RegionComponent,
    DepartemntComponent,
    ProfessionComponent,
    ConsulatComponent,
    JuridictionComponent,
    posteComponent,
    AdministrateurComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    SearchPipe,
    HttpClientModule,

  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
