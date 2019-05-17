import {DefaultCrudRepository} from '@loopback/repository';
import {TodoList} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodoListRepository extends DefaultCrudRepository<
  TodoList,
  typeof TodoList.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TodoList, dataSource);
  }
}
