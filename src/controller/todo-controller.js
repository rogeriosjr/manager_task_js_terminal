import { TaskModel } from "../model/todo.js";

export class TodoListController
{
    constructor( todoListModel, view )
    {
        this.todoListModel = todoListModel;
        this.view = view;
    }

    async addItem()
    {
        const { title, dueDate } = await this.view.displayAddItem();

        try {
            const task = new TaskModel(title, dueDate);

            await this.todoListModel.add(task);
            this.view.displayLog(`\nTarefa "${title}" adicionada com sucesso!\n`);
        } catch (error) {
            this.view.displayLog(`\nErro ao adicionar tarefa "${title}"\n`);
        }

        
    }

    listTask()
    {
        const todoList = this.todoListModel.getAll();
        
        if(!todoList.length) {
            this.view.displayLog('\nNenhuma tarefa encontrada\n');
            return;
        }

        this.view.displayItens(todoList);
    }

    async listTaskApi()
    {
        const todoList = await this.todoListModel.getAllApi();
        
        if(!todoList.length) {
            this.view.displayLog('\nNenhuma tarefa encontrada\n');
            return;
        }

        this.view.displayItens(todoList);
    }

    async completeTask()
    {
        const todoList = this.todoListModel.getAll();

        if(!todoList.length) {
            this.view.displayLog('\nNenhuma tarefa encontrada\n');
            return;
        }

        const { id } = await this.view.displaySelectItem(todoList);

        const task = this.todoListModel.get(id);
        task.status = 'done';

        this.view.displayLog(`\nTask changed ${task.title} with success!\n`);
    }

    async completeTaskApi()
    {
        try {
            const todoList = await this.todoListModel.getAllApi();

            if(!todoList.length) {
                this.view.displayLog('\nNenhuma tarefa encontrada\n');
                return;
            }

            const { id } = await this.view.displaySelectItem(todoList);

            await this.todoListModel.completeTaskApi(id);

            this.view.displayLog(`\nTask changed with success!\n`);
        } catch (error) {
            this.view.displayLog(`\nTask do not delete!\n`);
        }
        
    }

    async editTask()
    {
        const todoList = this.todoListModel.getAll();

        if(!todoList.length) {
            this.view.displayLog('\nNenhuma tarefa encontrada\n');
            return;
        }

        const { id } = await this.view.displaySelectItem(todoList);

        const task = this.todoListModel.get(id);

        const { title, dueDate } = await this.view.displayEditItem(task);

        this.todoListModel.update(id, {title, dueDate});

        this.view.displayLog(`\nTask ${title} edited with success! \n`);
    }

    async editTaskApi()
    {
        try {
            const todoList = await this.todoListModel.getAllApi();

            if(!todoList.length) {
                this.view.displayLog('\nNenhuma tarefa encontrada\n');
                return;
            }

            const { id } = await this.view.displaySelectItem(todoList);
            const task = this.todoListModel.get(id);
            const { title, dueDate } = await this.view.displayEditItem(task);

            await this.todoListModel.updateApi(id, {title, dueDate});

            this.view.displayLog(`\nTask ${title} edited with success! \n`);
        } catch (error) {
            this.view.displayLog(`\nErro ao editar tarefa ${title} \n`);
        }
        
    }

    async deleteTask()
    {
        const todoList = this.todoListModel.getAll();

        if(!todoList.length) {
            this.view.displayLog('\nNenhuma tarefa encontrada\n');
            return;
        }

        const { id } = await this.view.displaySelectItem(todoList);
        const task = this.todoListModel.get(id);

        this.todoListModel.delete(id);
        this.view.displayLog(`\nTask ${task.title} deleted with success!\n`);
    }

    async deleteTaskApi()
    {
        try {
            const todoList = await this.todoListModel.getAllApi();

            if(!todoList.length) {
                this.view.displayLog('\nNenhuma tarefa encontrada\n');
                return;
            }

            const { id } = await this.view.displaySelectItem(todoList);

            await this.todoListModel.deleteTaskApi(id);
            this.view.displayLog(`\nTask ${task.title} deleted with success!\n`)
        } catch (error) {
            this.view.displayLog(`\nTask not deleted!\n`);
        }
    }
}