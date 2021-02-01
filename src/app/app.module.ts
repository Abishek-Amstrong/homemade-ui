import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { ValidatorService } from 'src/app/modules/shared/services/validator.service';
import { AngularMaterialModule } from './modules/shared/angular-material.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    CarouselModule,
    CommonModule,
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }), // ToastrModule added
  ],
  providers: [ValidatorService],
  bootstrap: [AppComponent],
})
export class AppModule {}
