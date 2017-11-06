import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BottrainingComponent } from './bottraining.component';

describe('BottrainingComponent', () => {
  let component: BottrainingComponent;
  let fixture: ComponentFixture<BottrainingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BottrainingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BottrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
