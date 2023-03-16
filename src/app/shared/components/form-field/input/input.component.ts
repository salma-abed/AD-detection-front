import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { MatInputModule } from "@angular/material/input";
import { ErrorMessagesComponent } from '../error-messages/error-messages.component';

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, MatInputModule, ErrorMessagesComponent],
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
})
export class InputComponent implements OnInit {
  @Input() label!: string;
  @Input() floatLabel: FloatLabelType = 'always';
  @Input() className!: string;
  @Input() placeholder!: string;
  @Input() isReadOnly?: boolean;
  @Input() pattern?: string;
  @Input() type: 'text' | 'number' | 'password' | 'email' | 'tel' = 'text';
  @Input() controller: FormControl = new FormControl;
  @Input() required?: boolean;
  @Input() min?: number;
  @Input() minLength?: number;
  @Input() maxLength!: number;
  @Output() inputValueChanged = new EventEmitter();
  constructor() { }
  ngOnInit(): void {
    this.checkRequired();
  }
  public checkRequired(): void {
    if (this.controller.errors) {
      this.required = !this.required ? this.controller?.errors['required'] : this.required;
    }
  }

  public inputChanged(event: any): void {
    this.inputValueChanged.emit(event?.target?.value);
  }
}
