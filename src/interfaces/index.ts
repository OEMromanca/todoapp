export interface ITodo {
  id: string;
  title: string;
  category: string;
  duedate: string;
  completed: boolean;
  priority: string;
}

export type NewTodo = Omit<ITodo, 'id'>;
