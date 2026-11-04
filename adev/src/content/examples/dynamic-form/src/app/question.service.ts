// #docregion
import {Injectable} from '@angular/core';

import {DropdownQuestion} from './question-dropdown';
import {QuestionBase} from './question-base';
import {TextboxQuestion} from './question-textbox';
import {of} from 'rxjs';

@Injectable()
export class QuestionService {
  // TODO: get from a remote source of question metadata
  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new DropdownQuestion({
        key: 'favoriteAnimal',
        label: '좋아하는 동물',
        options: [
          {key: 'cat', value: '고양이'},
          {key: 'dog', value: '개'},
          {key: 'horse', value: '말'},
          {key: 'capybara', value: '카피바라'},
        ],
        order: 3,
      }),

      new TextboxQuestion({
        key: 'firstName',
        label: '이름',
        value: 'Alex',
        required: true,
        order: 1,
      }),

      new TextboxQuestion({
        key: 'emailAddress',
        label: '이메일',
        type: 'email',
        order: 2,
      }),
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}
