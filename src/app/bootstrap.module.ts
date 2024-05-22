import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbCollapseModule,
  NgbDropdownModule,
  NgbNavModule,
  NgbPopoverModule,
} from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [],
  imports: [CommonModule, NgbCollapseModule, NgbDropdownModule],
  exports: [
    NgbCollapseModule,
    NgbDropdownModule,
    NgbNavModule,
    NgbPopoverModule,
  ],
})
export class BootstrapModule {}
