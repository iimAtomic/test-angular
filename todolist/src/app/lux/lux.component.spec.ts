import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuxComponent } from './lux.component';

describe('LuxComponent', () => {
  let component: LuxComponent;
  let fixture: ComponentFixture<LuxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LuxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LuxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
