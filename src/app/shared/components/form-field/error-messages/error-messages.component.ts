import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { CommonModule } from '@angular/common';
import { ERROR_MESSAGE } from 'src/app/core/constants/error-message.constant';
import { MatFormFieldModule } from '@angular/material/form-field';
@Component({
  selector: 'app-error-messages',
  standalone: true,
  imports: [CommonModule,MatFormFieldModule],
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.scss'],
})
export class ErrorMessagesComponent implements OnInit {
  @Input() public control!: AbstractControl;
  @Input() public labelName?: string;
  ngOnInit(): void { }

  get errorMessage(): any {
    if (this.control?.errors && (this.control.touched || this.control.dirty)) {
      for (const propertyName in this.control.errors) {
        return this.getValidationErrorMessage(propertyName, this.labelName);
      }
    }
    return of('');
  }

  public getValidationErrorMessage(validatorName: string, labelName?: string): Observable<string> {
    return of(`${labelName}${ERROR_MESSAGE[validatorName]}`);
  }
}
