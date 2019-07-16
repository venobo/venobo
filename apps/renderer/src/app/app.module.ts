import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
// @ts-ignore
import { CoreModule } from '@venobo/core';

import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CoreModule.forRoot(),
    RouterModule,
    AppRouting,
  ],
})
export class AppModule {}
