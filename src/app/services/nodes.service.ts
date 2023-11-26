import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Node } from '../interfaces/node';
import { NodeMapper } from '../mapper/node.mapper';
import { deleteNode } from '../store/actions/nodes.actions';
import { NodeModel } from '../models/node.model';

@Injectable({
  providedIn: 'root',
})
export class NodesService {
  private http: HttpClient = inject(HttpClient);
  private nodeMapper: NodeMapper = inject(NodeMapper);

  getParentNodes(): Observable<NodeModel[]> {
    return this.http
      .get<Node[]>('https://api-graph.tests.grupoapok.com/api/nodes')
      .pipe(
        map((response) =>
          response.map((value) => this.nodeMapper.jsonToModel(value))
        )
      );
  }

  getChildNodes(parent: string): Observable<NodeModel[]> {
    return this.http
      .get<Node[]>(
        `https://api-graph.tests.grupoapok.com/api/nodes?parent=${parent}`
      )
      .pipe(
        map((response) =>
          response.map((value) => this.nodeMapper.jsonToModel(value))
        )
      );
  }

  getNode(id: string): Observable<NodeModel> {
    return this.http
      .get<Node>(`https://api-graph.tests.grupoapok.com/api/node/${id}`)
      .pipe(map((response) => this.nodeMapper.jsonToModel(response)));
  }

  createNode(body: { parent: number; title: string }): Observable<any> {
    return this.http.post(
      'https://api-graph.tests.grupoapok.com/api/node',
      body
    );
  }

  deleteNode(id: number): Observable<any> {
    return this.http.delete(
      `https://api-graph.tests.grupoapok.com/api/node/${id}`
    );
  }
}
