import { createSelector } from '@ngrx/store';
import { NodeState } from '../reducers/nodes.reducer';
import { AppState } from 'src/app/interfaces/app-state';

export const selectNodes = (state: AppState) => state.node;

export const selectParentNodes = createSelector(
  selectNodes,
  (state: NodeState) => state.parentNodes
);

export const selectChildNodes = createSelector(
  selectNodes,
  (state: NodeState) => state.childNodes
);

export const selectNode = createSelector(
  selectNodes,
  (state: NodeState) => state.node
);

export const selectErrorMessage = createSelector(
  selectNodes,
  (state: NodeState) => state.errorMessage
);

export const createdNode = createSelector(
  selectNodes,
  (state: NodeState) => state.createdNode
);
