import { Injectable } from '@angular/core';
import { Node } from '../interfaces/node';
import { NodeModel } from '../models/node.model';

@Injectable({
  providedIn: 'root',
})
export class NodeMapper {
  jsonToModel(json: Node): NodeModel {
    const node = new NodeModel();
    node.id = json.id;
    node.parent = json.parent;
    node.title = json.title;
    return node;
  }
}
