import {Entity, model, property} from '@loopback/repository';

@model({settings: {strict: false}})
export class TodoList extends Entity {
  @property({
    type: 'number',
    id: true,
    required: true,
    default: 1,
  })
  id: number;

  @property({
    type: 'string',
    required: true,
  })
  title: string;

  @property({
    type: 'string',
  })
  color?: string;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<TodoList>) {
    super(data);
  }
}
