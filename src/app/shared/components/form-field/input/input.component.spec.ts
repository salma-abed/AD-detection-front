import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';

import { InputComponent } from './input.component';

describe('InputComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[SharedModule, InputComponent, BrowserAnimationsModule]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('test input when Value change must emit this value', () => {
    let event = {
      target:{
        value:"Ahmed"
      }
    }
    component.inputChanged(event);
    fixture.detectChanges();
    component.inputValueChanged?.subscribe(res =>{
      expect(res).toEqual("Ahmed");
    })
  });

  it('test input checkRequired must return required from required @input', () => {
    component.required = true;
    let event = {
      target:{
        value:"Ahmed"
      }
    }
    component.controller.setErrors({
      required:true
    })
    component.checkRequired();
    fixture.detectChanges();

    expect(component.required).toBeTrue();
  });

  it('test input checkRequired must return required from control', () => {
    component.required = false;

    component.controller.setErrors({
      required:true
    })
    fixture.detectChanges();
    component.checkRequired();

    expect(component.required).toBeTrue();
  });
});
