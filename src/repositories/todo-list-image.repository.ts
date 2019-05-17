import {DefaultCrudRepository} from '@loopback/repository';
import {TodoListImage} from '../models';
import {DbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class TodoListImageRepository extends DefaultCrudRepository<
  TodoListImage,
  typeof TodoListImage.prototype.id
> {
  constructor(
    @inject('datasources.db') dataSource: DbDataSource,
  ) {
    super(TodoListImage, dataSource);
  }
}
