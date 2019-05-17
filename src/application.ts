import {TodoList} from './models/todo-list.model';
import {TodoListRepository} from './repositories/todo-list.repository';
import {BootMixin} from '@loopback/boot';
import {ApplicationConfig} from '@loopback/core';
import {
  RestExplorerBindings,
  RestExplorerComponent,
} from '@loopback/rest-explorer';
import {RepositoryMixin, SchemaMigrationOptions} from '@loopback/repository';
import {RestApplication} from '@loopback/rest';
import {ServiceMixin} from '@loopback/service-proxy';
import * as path from 'path';
import {MySequence} from './sequence';

export class DbMigrationApplication extends BootMixin(
  ServiceMixin(RepositoryMixin(RestApplication)),
) {
  constructor(options: ApplicationConfig = {}) {
    super(options);

    // Set up the custom sequence
    this.sequence(MySequence);

    // Set up default home page
    this.static('/', path.join(__dirname, '../public'));

    // Customize @loopback/rest-explorer configuration here
    this.bind(RestExplorerBindings.CONFIG).to({
      path: '/explorer',
    });
    this.component(RestExplorerComponent);

    this.projectRoot = __dirname;
    // Customize @loopback/boot Booter Conventions here
    this.bootOptions = {
      controllers: {
        // Customize ControllerBooter Conventions here
        dirs: ['controllers'],
        extensions: ['.controller.js'],
        nested: true,
      },
    };
  }
  async migrateSchema(options?: SchemaMigrationOptions) {
    // 1. Run migration scripts provided by connectors
    await super.migrateSchema(options);

    // 2. Make further changes. When creating predefined model instances,
    // handle the case when these instances already exist.
    const todoListRepo = await this.getRepository(TodoListRepository);
    let todoListDataArray: TodoList[] = [];
    const todoListData = [
      {id: 1, title: 'This is a 1 test', color: ''},
      {id: 2, title: 'This is a 2 test', color: ''},
      {id: 3, title: 'This is a 3 test', color: ''},
      {id: 4, title: 'This is a 4 test', color: ''},
    ];

    // const questionTypeArray = [
    //   {id: 1, questionType: 'aware_credit_score'},
    //   {id: 2, questionType: 'credit_history'},
    //   {id: 3, questionType: 'big_loans'},
    //   {id: 4, questionType: 'more_data'},
    //   {id: 5, questionType: 'scared_netbanking'},
    //   {id: 6, questionType: 'spamming'},
    //   {id: 7, questionType: 'two_wheeler'},
    //   {id: 8, questionType: 'car'},
    //   {id: 9, questionType: 'language'}
    // ];

    // const optionsArray = [
    //   {id: 1, options: 'Yes, No'},
    //   {id: 2, options: 'Yes, No, Maybe'},
    //   {id: 3, options: 'Yes, No, Now I am'},
    //   {id: 4, options: 'Yes, No, Sometimes'},
    //   {id: 5, options: 'English, Hindi, Tamil, Telugu, Marathi, Kannada'}
    // ];

    // const questionsArray = [
    //   {id: 1, question: 'Are you aware of your credit score?', optionId: 1,commentFlag: 0, questionTypeId: 1},
    //   {id: 2, question: 'Do you think good credit history is important to you?', optionId: 1 ,commentFlag:0 , questionTypeId: 2},
    //   {id: 3, question: 'Do you plan to take big/secured loans in the future?', optionId: 1,commentFlag: 0, questionTypeId: 3},
    //   {id: 4, question: 'Will you share more data if it might help increase your credit limit?', optionId: 2,commentFlag: 0, questionTypeId: 4},
    //   {id: 5, question: 'Were you scared about sharing your netbanking password?', optionId: 3,commentFlag:0 , questionTypeId: 5},
    //   {id: 6, question: 'Are we spamming you? (Email/SMS/WhatsApp/Calls)?', optionId:4 ,commentFlag:0 , questionTypeId: 6},
    //   {id: 7, question: 'Do you own a two-wheeler?', optionId: 1,commentFlag:0 , questionTypeId: 7},
    //   {id: 8, question: 'Do you own a car?', optionId: 1,commentFlag:0 , questionTypeId: 8},
    //   {id: 9, question: 'What language do you prefer for communications?', optionId: 5,commentFlag:0 , questionTypeId: 9}
    // ];

    todoListData.forEach(todoList => {
      let todoListInfo: TodoList = new TodoList();
      todoListInfo.id = todoList.id;
      todoListInfo.title = todoList.title;
      todoListInfo.color = todoList.color;
      todoListDataArray.push(todoListInfo);
    });
    await todoListRepo.createAll(todoListDataArray);
  }
}
