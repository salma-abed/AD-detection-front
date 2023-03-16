import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CustomTableComponent } from '../custom-table/custom-table.component';
import { PaginationComponent } from './pagination.component';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;
  let customTableComponent: CustomTableComponent;
  let customTableFixture: ComponentFixture<CustomTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationComponent, BrowserAnimationsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();


    customTableFixture = TestBed.createComponent(CustomTableComponent);
    customTableComponent = customTableFixture.componentInstance;
    customTableFixture.detectChanges();
  });

  it('component created successfully', () => {
    component.length = 12;
    component.pageIndex = 0;
    expect(component).toBeTruthy();
  });

  it('test handlePageEvent to send values', () => {
    component.handlePageEvent({
    pageIndex: 0,
    previousPageIndex: 0,
    pageSize: 0,
    length: 0})
    customTableFixture.whenStable().then(() =>{
      component.paginationOptions.subscribe(e =>{
        expect(e.pageIndex).toEqual(0);
        expect(e.previousPageIndex).toEqual(0);
        expect(e.pageSize).toEqual(0);
        expect(e.length).toEqual(0);
      })
    })
  });
});
