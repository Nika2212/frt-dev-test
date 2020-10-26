import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExpanderDirective } from './directives/expander.directive';



@NgModule({
  declarations: [
    ExpanderDirective
  ],
  exports: [
    ExpanderDirective
  ]
})
export class SharedModule { }
