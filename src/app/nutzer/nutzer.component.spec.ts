import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NutzerComponent } from './nutzer.component';

describe('NutzerComponent', () => {
  let component: NutzerComponent;
  let fixture: ComponentFixture<NutzerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NutzerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NutzerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
