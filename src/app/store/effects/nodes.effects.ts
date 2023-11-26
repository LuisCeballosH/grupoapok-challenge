import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { EMPTY, of } from 'rxjs';
import { map, exhaustMap, catchError } from 'rxjs/operators';
import { NodeActions } from '../actions/nodes.actions';
import { NodesService } from 'src/app/services/nodes.service';

@Injectable()
export class NodesEffects {
  private actions$: Actions = inject(Actions);
  private nodesService: NodesService = inject(NodesService);

  getParentNodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NodeActions.getParentNodes),
      exhaustMap(() =>
        this.nodesService.getParentNodes().pipe(
          map((nodes) => ({
            type: NodeActions.setParentNodes,
            payload: nodes,
          })),
          catchError(() => EMPTY)
        )
      )
    )
  );

  getChildNodes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NodeActions.getChildNodes),
      exhaustMap((action: any) => {
        return this.nodesService.getChildNodes(action.parent).pipe(
          map((nodes) => ({
            type: NodeActions.setChildNodes,
            payload: nodes,
          })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  getNode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NodeActions.getNode),
      exhaustMap((action: any) => {
        return this.nodesService.getNode(action.id).pipe(
          map((node) => ({
            type: NodeActions.setNode,
            payload: node,
          })),
          catchError(() => EMPTY)
        );
      })
    )
  );

  createNode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NodeActions.createNode),
      exhaustMap((action: any) => {
        return this.nodesService
          .createNode({ parent: action.parent, title: action.title })
          .pipe(
            map(() => ({
              type: NodeActions.createdNode,
            })),
            catchError((e) =>
              of({
                type: NodeActions.setErrorMessage,
                payload: e.error.message,
              })
            )
          );
      })
    )
  );

  deleteNode$ = createEffect(() =>
    this.actions$.pipe(
      ofType(NodeActions.deleteNode),
      exhaustMap((action: any) => {
        return this.nodesService.deleteNode(action.id).pipe(
          map(() => ({
            type: NodeActions.getChildNodes,
            parent: action.node.id,
          })),
          catchError((e) =>
            of({
              type: NodeActions.setErrorMessage,
              payload: e.error.message,
            })
          )
        );
      })
    )
  );
}
