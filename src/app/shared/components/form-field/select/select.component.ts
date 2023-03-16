import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType, MatFormFieldAppearance } from '@angular/material/form-field';
import { Subscription } from 'rxjs/internal/Subscription';
import { debounceTime } from 'rxjs/internal/operators/debounceTime';
import { distinctUntilChanged } from 'rxjs/internal/operators/distinctUntilChanged';
import { ErrorMessagesComponent } from '../error-messages/error-messages.component';
import { MatSelectModule } from "@angular/material/select";
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-select',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatIconModule, MatTooltipModule, MatSelectModule, ErrorMessagesComponent],
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss']
})
export class SelectComponent implements OnInit, OnDestroy {
  public subscription$: Subscription = new Subscription();
  @Input() label!: string;
  @Input() appearance!: MatFormFieldAppearance;
  @Input() tooltip!: string;
  @Input() optionValue!: string;
  @Input() optionLabel!: string;
  @Input() listType!: string;
  @Input() placeholder!: string;
  @Input() floatLabel: FloatLabelType = "always";
  @Input() className: string = 'primary-form gray-input';
  @Input() searchable: boolean = false;
  @Input() displayClearBtn: boolean = false;
  @Input() multiple: boolean = false;
  @Input() searchOptions!: any;
  @Input() data!: any[];
  @Input() controller: FormControl<any> = new FormControl;
  @Output() onChange = new EventEmitter();
  @Output() onSearch = new EventEmitter();
  @Output() onClear = new EventEmitter();
  public searchCtrl: FormControl = new FormControl();
  constructor() { }
  ngOnInit(): void {
    this.search();
  }
  public search(): void {
    this.subscription$.add(
      this.searchCtrl.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe({
          next: (value) => {
            this.onSearch.emit(value)
          },
        })
    );
  }

  emitSelectedValue(event: any): void {
    this.onChange.emit(event?.value);
  }

  emitClear(event: Event): void {
    this.onClear.emit(event);
  }

  clearSearch() {
    if (this.searchCtrl.value.length) {
      this.searchCtrl.reset();
    }
  }

  ngOnDestroy(): void {
    this.subscription$.unsubscribe();
  }
}
