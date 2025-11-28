export class TaskModel
{
    #title;
    #dueDate;
    #status;
    #id;

    constructor( title, dueDate )
    {
        this.#title = title;
        this.#dueDate = dueDate;
        this.#status = 'pending';
        this.#id = Date.now();
    }

    get title()
    {
        return this.#title;
    }

    set title(value)
    {
        this.#title = value;
    }

    get dueDate()
    {
        return this.#dueDate;
    }

    set dueDate(value)
    {
        this.#dueDate = value;
    }

    get status()
    {
        return this.#status;
    }

    set status(value)
    {
        this.#status = value;
    }

    get id()
    {
        return this.#id;
    }

    set id(value)
    {
        this.#id = value;
    }

    toJson()
    {
        return {
            title: this.#title,
            dueDate: this.#dueDate
        }
    }
}

export class todoListModel
{
    #BASE_URL = 'https://alunos.treinaweb.com.br/tw-todos/api/v1';
    todoList = [];

    constructor(){}

    #convertDatePTBRToISO(datePTBR)
    {
        const [dia, mes, ano] = datePTBR.split('/');
        return `${ano}-${mes}-${dia}`;
    }
    #convertDateISOToPTBR(datePTBR)
    {
        const [ano, mes, dia] = datePTBR.split('-');
        return `${dia}/${mes}/${ano}`;
    }

    async add(task)
    {
        this.todoList.push(task);

        task.dueDate = this.#convertDatePTBRToISO(task.dueDate);
        const response = await fetch(`${this.#BASE_URL}/todos`, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(task.toJson())
            }
        );

        if(!response.ok) {
            throw '';
        }
    }

    getAll()
    {
        return this.todoList;
    }

    async getAllApi()
    {
        const response = await fetch(`${this.#BASE_URL}/todos`);

        if(!response.ok) {
            throw '';
        }

        const todoList = await response.json();
        return todoList.map((taskAPI) => {
            let task = new TaskModel(
                taskAPI.title,
                this.#convertDateISOToPTBR(taskAPI.dueDate)
            );
            task.id = taskAPI.id;
            task.status = taskAPI.status;

            return task;
        });
    }

    get(id)
    {
        return this.todoList.find(task => task.id === id);
    }

    update(id, data)
    {
        const task = this.get(id);
        Object.assign(task, data);
    }

    async updateApi(id, data)
    {
        data.dueDate = this.#convertDatePTBRToISO(data.dueDate);

        const response = await fetch(`${this.#BASE_URL}/todos/${id}`,{
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        });

        if(!response.ok) {
            throw '';
        }
    }

    delete(id)
    {
        this.todoList = this.todoList.filter(task => task.id !== id);
    }

    async deleteTaskApi(id)
    {
        const response = await fetch(`${this.#BASE_URL}/todos/${id}`, {
            method: 'DELETE',
        });

        if(!response.ok) {
            throw '';
        }
    }

    async completeTaskApi(id)
    {
        const response = await fetch(`${this.#BASE_URL}/todos/${id}/finish`,{
            method: 'POST'
        });

        if(!response.ok) {
            throw '';
        }
    }
}