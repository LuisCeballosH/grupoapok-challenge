import { Component, DestroyRef, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import {
  createNode,
  getParentNodes,
} from 'src/app/store/actions/nodes.actions';
import {
  createdNode,
  selectParentNodes,
} from 'src/app/store/selectors/nodes.selector';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { NodeModel } from 'src/app/models/node.model';
import { Router } from '@angular/router';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class CreatePage {
  private store: Store<any> = inject(Store);
  private fb: FormBuilder = inject(FormBuilder);
  nodes$: Observable<NodeModel[]> = of([]);
  private router: Router = inject(Router);
  private destroy: Subject<void> = new Subject<void>();

  form = this.fb.nonNullable.group({
    parent: ['', Validators.required],
    title: ['', Validators.required],
  });

  ionViewWillEnter(): void {
    this.store.dispatch(getParentNodes());
    this.nodes$ = this.store.select(selectParentNodes);
    this.store
      .select(createdNode)
      .pipe(takeUntil(this.destroy))
      .subscribe((value) => {
        value && this.router.navigate(['/']);
      });
  }

  ionViewWillLeave() {
    console.log('object');
    this.destroy.next();
    this.destroy.complete();
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.store.dispatch(
        createNode({
          parent: Number(this.form.controls.parent.value),
          title: this.form.controls.title.value,
        })
      );
    }
  }
}
