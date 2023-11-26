import { createAction, props } from '@ngrx/store';
import { NodeModel } from 'src/app/models/node.model';

export enum NodeActions {
  getParentNodes = '[Nodes] get parent nodes',
  getChildNodes = '[Nodes] get child nodes',
  getNode = '[Nodes] get node',
  setParentNodes = '[Nodes] set parent nodes',
  setChildNodes = '[Nodes] set child nodes',
  setNode = '[Nodes] set node',
  deleteNode = '[Nodes] delete node',
  createNode = '[Nodes] create node',
  createdNode = '[Nodes] created node',
  setErrorMessage = '[Nodes] set error message',
}

export const getParentNodes = createAction(NodeActions.getParentNodes);

export const getChildNodes = createAction(
  NodeActions.getChildNodes,
  props<{ parent: string }>()
);

export const getNode = createAction(
  NodeActions.getNode,
  props<{ id: string }>()
);

export const setParentNodes = createAction(
  NodeActions.setParentNodes,
  props<{ payload: NodeModel[] }>()
);

export const setChildNodes = createAction(
  NodeActions.setChildNodes,
  props<{ payload: NodeModel[] }>()
);

export const setNode = createAction(
  NodeActions.setNode,
  props<{ payload: NodeModel }>()
);

export const deleteNode = createAction(
  NodeActions.deleteNode,
  props<{ id: number; node: NodeModel }>()
);

export const setErrorMessage = createAction(
  NodeActions.setErrorMessage,
  props<{ payload: string }>()
);

export const createNode = createAction(
  NodeActions.createNode,
  props<{ parent: number; title: string }>()
);

export const createdNode = createAction(NodeActions.createdNode);
