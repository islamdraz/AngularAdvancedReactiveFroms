import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SmInputComponent } from './sm-input.component';

describe('SmInputComponent', () => {
  let component: SmInputComponent;
  let fixture: ComponentFixture<SmInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SmInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SmInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
