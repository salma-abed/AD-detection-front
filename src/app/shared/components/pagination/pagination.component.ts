import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    CommonModule,
    MatPaginatorModule,
  ],
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Output() paginationOptions = new EventEmitter();
  @Input() length?: number;
  @Input() pageIndex = 0;
  public pageSize = 0;
  public pageSizeOptions = [10, 25, 50];
  public pageEvent?: PageEvent;

  constructor() { }

  ngOnInit(): void { }

  public handlePageEvent(event: PageEvent) {
    let { pageIndex, pageSize, length } = event;
    this.paginationOptions.emit({
      currentPage: pageIndex,
      pageSize,
      length,
    });
    this.pageEvent = event;
    this.pageSize = pageSize;
    this.length = length;
    this.pageIndex = pageIndex;
  }
}
