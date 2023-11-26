import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, Subject, of, takeUntil } from 'rxjs';
import { NodeModel } from 'src/app/models/node.model';
import { getParentNodes } from 'src/app/store/actions/nodes.actions';
import { selectParentNodes } from 'src/app/store/selectors/nodes.selector';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-node-list',
  templateUrl: './node-list.page.html',
  styleUrls: ['./node-list.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink],
})
export class NodeListPage {
  private store: Store<any> = inject(Store);
  private router: Router = inject(Router);
  private platform: Platform = inject(Platform);
  private destroy: Subject<void> = new Subject<void>();

  nodes$: Observable<NodeModel[]> = of([]);

  ionViewWillEnter(): void {
    this.store.dispatch(getParentNodes());
    this.nodes$ = this.store.select(selectParentNodes);
    this.platform.backButton.pipe(takeUntil(this.destroy)).subscribe(() => {
      (navigator as any).app.exitApp();
    });
  }

  ionViewWillLeave() {
    this.destroy.next();
    this.destroy.complete();
  }

  onView(node: NodeModel): void {
    this.router.navigate(['/node', node.id]);
  }
}
