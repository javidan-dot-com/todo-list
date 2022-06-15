import { v4 as uuidV4 } from 'uuid'

const list = document.querySelector<HTMLUListElement>('#list');
const form = document.querySelector<HTMLFormElement>('#new-task-form');
const input = document.querySelector<HTMLInputElement>('#new-task-title');

interface Task {
  title: string
  id: string
  completed: boolean
  createdAt: Date
}

const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

form?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  console.log('SUBMITTED')
  if (input?.value == '' || input?.value == null) return;

  const newTask: Task = {
    title: input.value,
    id: uuidV4(),
    completed: false,
    createdAt: new Date(),
  }

  addListItem(newTask);
  tasks.push(newTask);
  input.value = '';
})

function addListItem (task: Task) {
  const item = document.createElement('li');
  const label = document.createElement('label');
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = task.completed;
  checkbox.addEventListener('change', () => {
    task.completed = checkbox.checked;
    saveTasks();
  })
  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

function saveTasks () {
  localStorage.setItem('TASKS', JSON.stringify(tasks));
}

function loadTasks (): Task[] {
  const taskJSON = localStorage.getItem('TASKS')
  if(taskJSON == null) return []
  return JSON.parse(taskJSON)
}