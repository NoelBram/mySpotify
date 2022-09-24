import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpotifyFormComponent } from './spotify-form.component';

describe('SpotifyFormComponent', () => {
  let component: SpotifyFormComponent;
  let fixture: ComponentFixture<SpotifyFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpotifyFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpotifyFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
