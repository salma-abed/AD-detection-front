import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacySelectModule as MatSelectModule } from '@angular/material/legacy-select';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from '@app/shared/shared.module';
import { ErrorMessagesComponent } from '../error-messages/error-messages.component';
import { SelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: SelectComponent;
  let fixture: ComponentFixture<SelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ],
      imports:[
        BrowserAnimationsModule,
        SharedModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MatIconModule,
        MatSelectModule,
        ErrorMessagesComponent,
        MatTooltipModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('component created successfully', () => {
    expect(component).toBeTruthy();
  });


  it('test emit onClear to send selected values ', () => {
    let event:any = {
      stopPropagation: () => {
        return true
      }
    }
    component.emitClear(event)

  });
  it('test emitSelectedValue to send selected values ', () => {
    component.emitSelectedValue(['item1','item2'])
    component.onChange.subscribe(e =>{
      expect(e).toContain('item1');
      expect(e).toContain('item2');
    })

  });


  it('test Search Change to send selected values ', fakeAsync(() => {
    fixture.detectChanges(); // render
    expect(component.searchCtrl?.value).toBe(null);
    component?.searchCtrl?.setValue("v");

    tick(500);
    component.onSearch.subscribe(e =>{
      expect(e).toContain('v');
    })
    fixture.detectChanges(); // render
  }));

  it('test Search about value and click clearSearch ', fakeAsync(() => {
    fixture.detectChanges(); // render
    expect(component.searchCtrl?.value).toBe(null);
    component?.searchCtrl?.setValue("v");
    tick(500);
    component.clearSearch();
    tick(500);
    expect(component?.searchCtrl?.value).toBeNull();

    fixture.detectChanges(); // render
  }));
});
