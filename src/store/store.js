import { observable, autorun, toJS } from 'mobx';

import App from './app';
import User from './user';
import Dock from './dock';
import Modal from './modal';
import Avatar from './avatar';
import Desktop from './desktop';

export default class Store {
  constructor () {
    _.forIn(this.autorunList, v => autorun(v));
  }

  @observable app = new App(this);
  @observable user = new User(this);
  @observable dock = new Dock(this);
  @observable modal = new Modal(this);
  @observable avatar = new Avatar(this);
  @observable desktop = new Desktop(this);

  // 自动运行列表
  autorunList = {
    print: () => {
      console.group('%c[store]全局', 'color: green;');
      console.log('desktop: ', toJS(this.desktop));
      console.log('avatar: ', toJS(this.avatar));
      console.log('modal: ', toJS(this.modal));
      console.log('user: ', toJS(this.user));
      console.log('dock: ', toJS(this.dock));
      console.log('dock: ', toJS(this.dock));
      console.groupEnd();
    },
  }
}
