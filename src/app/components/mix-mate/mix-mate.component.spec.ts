import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixMateComponent } from './mix-mate.component';

describe('MixMateComponent', () => {
  let component: MixMateComponent;
  let fixture: ComponentFixture<MixMateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixMateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixMateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
