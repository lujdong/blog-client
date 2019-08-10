import Tag from './Tag';
import Note from './Note';
import Article from './Article';

export default [
  // {
  //   name: '文章',
  //   icon: 'icon-wenzhang',
  //   code: 'article',
  //   path: '/article',
  //   defaultUrl: '/article',
  //   component: Article
  // },
  {
    name: '笔记',
    code: 'note',
    path: '/note',
    component: Note,
    icon: 'icon-jilu',
    defaultUrl: '/note',
    defaultParams: { width: 980, height: 500, offsetX: 50, offsetY: 50 },
  },
  // {
  //   name: '标签',
  //   icon: 'icon-biaoqian1',
  //   code: 'tag',
  //   path: '/tag',
  //   defaultUrl: '/tag',
  //   component: Tag
  // },
];