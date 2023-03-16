import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from '@angular/animations';
import { MapValuePipe } from '../../pipes/map-value.pipe';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DomSanitizer } from '@angular/platform-browser';
import { PaginationComponent } from '../pagination/pagination.component';
import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';

@Component({
  selector: 'app-custom-table',
  standalone: true,
  imports: [
    CommonModule,
    MapValuePipe,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
    MatButtonModule,
    PaginationComponent,
    LoadingSpinnerComponent
  ],
  templateUrl: './custom-table.component.html',
  styleUrls: ['./custom-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*', minHeight: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      ),
    ]),
  ],
})
export class CustomTableComponent implements OnInit {
  @Input() tableID: string = 'table_id';
  @Input() expanded: any;
  @Input() dataSource?: any;
  @Input() loading?: boolean;
  @Input() showToolTip?: boolean;
  @Output() actionsEmitter = new EventEmitter();
  @Output() paginationEmitter = new EventEmitter();
  @Output() expandedEmitter = new EventEmitter();
  expandedElement: any;
  constructor(
    private _matIconRegistry: MatIconRegistry,
    private _domSanitizer: DomSanitizer
  ) {
    this._matIconRegistry.addSvgIcon(
      'lock',
      this._domSanitizer.bypassSecurityTrustResourceUrl(
        './assets/images/lock.svg'
      )
    );
  }

  ngOnInit(): void { }

  onActionClicked(item: any, ACTION_TYPE: string, event: any): void {
    this.actionsEmitter.emit({ item, ACTION_TYPE });
    event?.stopPropagation();
  }
}
