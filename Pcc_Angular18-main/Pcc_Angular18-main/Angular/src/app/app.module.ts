import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './admin/login/login.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharedModule } from './admin/shared/shared.module';
import { MinistreComponent } from './admin/modules/ministre/ministre.component';
import { ChancelierComponent } from './admin/modules/chancelier/chancelier.component';
import { AuthService } from './services/auth.service';
import { AuthInterceptor } from './interceptors/interceptor';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MinistreComponent,
    ChancelierComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    SharedModule,
    HttpClientModule,

  ],
  providers: [AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
