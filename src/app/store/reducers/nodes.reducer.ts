import { createReducer, on } from '@ngrx/store';
import {
  setChildNodes,
  setErrorMessage,
  setParentNodes,
  setNode,
  createdNode,
} from '../actions/nodes.actions';
import { NodeModel } from 'src/app/models/node.model';

export interface NodeState {
  parentNodes: NodeModel[];
  childNodes: NodeModel[];
  node: NodeModel;
  errorMessage: string;
  createdNode: boolean;
}

export const initialState: NodeState = {
  parentNodes: [],
  childNodes: [],
  node: new NodeModel(),
  errorMessage: '',
  createdNode: false,
};

export const nodesReducer = createReducer(
  initialState,
  on(setParentNodes, (state, { payload }) => ({
    ...state,
    parentNodes: payload,
    createdNode: false,
  })),
  on(setChildNodes, (state, { payload }) => ({
    ...state,
    childNodes: payload,
    createdNode: false,
  })),
  on(setNode, (state, { payload }) => ({
    ...state,
    node: payload,
    createdNode: false,
  })),
  on(setErrorMessage, (state, { payload }) => ({
    ...state,
    errorMessage: payload,
    createdNode: false,
  })),
  on(createdNode, (state) => ({
    ...state,
    createdNode: true,
  }))
);
