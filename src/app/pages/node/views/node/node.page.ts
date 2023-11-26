import { Component, DestroyRef, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, filter, of, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  deleteNode,
  getChildNodes,
  getNode,
  setErrorMessage,
} from 'src/app/store/actions/nodes.actions';
import { NodeModel } from 'src/app/models/node.model';
import {
  selectChildNodes,
  selectErrorMessage,
  selectNode,
} from 'src/app/store/selectors/nodes.selector';

@Component({
  selector: 'app-node',
  templateUrl: './node.page.html',
  styleUrls: ['./node.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class NodePage {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private destroy: Subject<void> = new Subject<void>();
  private store: Store<any> = inject(Store);

  nodes$: Observable<NodeModel[]> = of([]);
  node = signal(new NodeModel());
  message = signal('');
  isToastOpen: boolean = false;

  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
    setTimeout(() => {
      this.isToastOpen = false;
      this.store.dispatch(setErrorMessage({ payload: '' }));
    }, 3000);
  }

  ionViewWillEnter(): void {
    this.activatedRoute.paramMap
      .pipe(takeUntil(this.destroy))
      .subscribe((params) => {
        this.store.dispatch(getNode({ id: params.get('id')! }));
        this.store.dispatch(getChildNodes({ parent: params.get('id')! }));
      });

    this.nodes$ = this.store.select(selectChildNodes);

    this.store
      .select(selectNode)
      .pipe(takeUntil(this.destroy))
      .subscribe((data) => this.node.set(data));

    this.store
      .select(selectErrorMessage)
      .pipe(
        takeUntil(this.destroy),
        filter((value) => !!value)
      )
      .subscribe((data) => {
        this.setOpen(true);
        this.message.set(data);
      });
  }

  ionViewWillLeave() {
    this.destroy.next();
    this.destroy.complete();
  }

  onDelete(id: number): void {
    this.store.dispatch(deleteNode({ id, node: this.node() }));
  }
}
