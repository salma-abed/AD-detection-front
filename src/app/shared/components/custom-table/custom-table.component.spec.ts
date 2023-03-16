import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { SharedModule } from '@app/shared/shared.module';
import { PaginationComponent } from '../pagination/pagination.component';
import { CustomTableComponent } from './custom-table.component';

describe('CustomTableComponent', () => {
  let component: CustomTableComponent;
  let fixture: ComponentFixture<CustomTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PaginationComponent,
        CustomTableComponent,
        SharedModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('component created successfully', () => {
    expect(component).toBeTruthy();
  });

  it('test On Action Clicked to send action event ', fakeAsync(() => {
    fixture.detectChanges(); // render
    let action = {
      item:{name:"Domain name"},
      ACTION_TYPE:"DELETE",
    }
    component.onActionClicked(action?.item,action?.ACTION_TYPE,null);

    component.actionsEmitter.subscribe((res:{item: any, ACTION_TYPE: string}) => {
      expect(res?.item?.name).toEqual(action?.item?.name);
      expect(res?.ACTION_TYPE).toEqual(action?.ACTION_TYPE);
    })


    fixture.detectChanges(); // render
  }));
});
