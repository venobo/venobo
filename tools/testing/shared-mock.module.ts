import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserTestingModule } from '@angular/platform-browser/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { CommonModule } from '@angular/common';

import { TranslateTestingModule } from './translate-testing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserTestingModule,
    HttpClientTestingModule,
    RouterTestingModule,
    TranslateTestingModule,
    NoopAnimationsModule,
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    //BrowserTestingModule,
    HttpClientTestingModule,
    RouterTestingModule,
    TranslateTestingModule,
    NoopAnimationsModule,
  ],
})
export class SharedMockModule {}
