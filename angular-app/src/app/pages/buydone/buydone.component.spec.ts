import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuydoneComponent } from './buydone.component';

describe('BuydoneComponent', () => {
  let component: BuydoneComponent;
  let fixture: ComponentFixture<BuydoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BuydoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BuydoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
