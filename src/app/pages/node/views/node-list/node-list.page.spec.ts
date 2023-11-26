import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NodeListPage } from './node-list.page';

describe('NodeListPage', () => {
  let component: NodeListPage;
  let fixture: ComponentFixture<NodeListPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(NodeListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
