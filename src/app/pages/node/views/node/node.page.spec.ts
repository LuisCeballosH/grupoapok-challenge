import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodePage } from './node.page';

describe('NodePage', () => {
  let component: NodePage;
  let fixture: ComponentFixture<NodePage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
