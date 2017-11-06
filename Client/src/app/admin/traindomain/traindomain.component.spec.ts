import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TraindomainComponent } from './traindomain.component';

describe('TraindomainComponent', () => {
  let component: TraindomainComponent;
  let fixture: ComponentFixture<TraindomainComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TraindomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TraindomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
