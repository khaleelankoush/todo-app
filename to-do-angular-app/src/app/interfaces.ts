export interface Status {
  _id: string;
  title: string;
  weight: number;
  color: string;
}

export interface SubTask {
  title: string;
  complete: boolean;
}

export interface Task {
  _id: string;
  title: string;
  description?: string;
  status: Status;
  weight: number;
  subtasks: SubTask[];
  complete: number;
}
