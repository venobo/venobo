import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { dispatchMouseEvent } from '@venobo/testing';

import { PosterComponent } from './poster.component';

describe('PosterComponent', () => {
  let component: PosterComponent;
  let fixture: ComponentFixture<PosterComponent>;
  let dl: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PosterComponent]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosterComponent);
    component = fixture.componentInstance;
    dl = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('image', () => {
    let frontImage: DebugElement;

    beforeEach(() => {
      frontImage = dl.query(By.css('.front-image'));
    });

    it(`shouldn't show front image`, () => {
      expect(frontImage).toBeNull();
    });

    it('should show front image', () => {
      component.image = '';
      fixture.detectChanges();
      expect(frontImage).toBeDefined();
    });
  });

  describe('events', () => {
    let front: DebugElement;

    beforeEach(() => {
      front = dl.query(By.css('.front'));
    });

    it('should emit mouseenter', () => {
      const mouseEnterSpy = jest.spyOn(component.mouseEnter, 'next');

      dispatchMouseEvent(front, 'mouseenter');
      expect(mouseEnterSpy).toHaveBeenCalled();
    });

    it('should emit mouseleave', () => {
      const mouseLeaveSpy = jest.spyOn(component.mouseLeave, 'next');

      dispatchMouseEvent(front, 'mouseleave');
      expect(mouseLeaveSpy).toHaveBeenCalled();
    });
  })
});
