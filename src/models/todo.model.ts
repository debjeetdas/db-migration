import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_todo_todoListId: {
        name: 'fk_todo_todoListId',
        entity: 'TodoList',
        entityKey: 'id',
        foreignKey: 'todolistid',
      },
    },
  },
})
export class Todo extends Entity {
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
  desc?: string;

  @property({
    type: 'boolean',
  })
  iscomplete?: boolean;

  @property({
    type: 'number',
    required: true,
  })
  todolistid: number;

  // Define well-known properties here

  // Indexer property to allow additional data
  [prop: string]: any;

  constructor(data?: Partial<Todo>) {
    super(data);
  }
}
