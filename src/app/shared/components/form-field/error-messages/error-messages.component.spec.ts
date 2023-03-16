import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';

import { ErrorMessagesComponent } from './error-messages.component';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { MatLegacyFormFieldModule as MatFormFieldModule } from '@angular/material/legacy-form-field';
import { CommonModule } from '@angular/common';

describe('ErrorMessagesComponent', () => {
  let component: ErrorMessagesComponent;
  let fixture: ComponentFixture<ErrorMessagesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        CommonModule,
        ErrorMessagesComponent,
        MatFormFieldModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ErrorMessagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('error message must be add label name "Name" to error message "is required" to be "Name is required"', () => {
    let errorMessage = component.getValidationErrorMessage('required','Name');
    errorMessage.subscribe(res =>{
      expect(res).toEqual("Name is required");
    })
  });

  it('get error message from control', () => {
    component.labelName = 'Name';
    component.control = new FormControl('',[Validators.required]);
    component.control.markAsTouched()
    fixture.detectChanges();
    (component.errorMessage as Observable<string>)?.subscribe(res =>{
      expect(res).toEqual("Name is required");
    })
  });
});
