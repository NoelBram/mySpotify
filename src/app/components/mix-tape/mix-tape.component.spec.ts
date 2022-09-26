import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MixTapeComponent } from './mix-tape.component';

describe('MixTapeComponent', () => {
  let component: MixTapeComponent;
  let fixture: ComponentFixture<MixTapeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MixTapeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MixTapeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
