interface BaseEntity {
  id: number
  order: number
}

export interface Board extends BaseEntity {
  name: string
  todos: Todo[]
}

export interface Todo extends BaseEntity {
  title: string
  subTasks: SubTask[]
  boardId: number
}

export interface SubTask extends BaseEntity {
  text: string
  isDone: boolean
  todoId: number
}

export interface IUser extends Omit<BaseEntity, 'order'> {
  email: string
  fullName: string
}

export interface IRegisterPayload extends Omit<IUser, 'id' | 'fullName'> {
  firstName: string
  lastName: string
  password: string
}

export interface ILoginCredentials {
  email: string
  password: string
}

export interface ILoginResult {
  user: IUser
  token: string
}
export enum PageRoute {
  home = 'home',
  boards = 'boards',
  todos = 'todos',
  completed = 'completed',
  signup = 'signup',
  login = 'login',
}

export type DataToRender = Board[] | Todo[] | SubTask[]
export type DataToRenderType = Board | Todo | SubTask
export enum DataToRenderTypeEnum {
  board = 'board',
  todo = 'todo',
  subTask = 'subTask',
}
