import inquirer from "inquirer";

export class TodoView
{
    async displayMenu()
    {
        const { option } = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Choice an option:',
                choices: [
                    'Add item',
                    'Listar tarefas',
                    'Listar da API',
                    'Marcar como concluída',
                    'Completar da API',
                    'Edit task',
                    'Editar da API',
                    'Delete task',
                    'Deletar da API',
                    'Sair'
                ]
            }
        ]);

        return { option };
    }

    async displayAddItem()
    {
        const { title, dueDate } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Digite o título da todo',
            },
            {
                type: 'input',
                name: 'dueDate',
                message: 'Digite data de vencimento do item',
            }
        ]);

        return { title, dueDate };
    }

    displayItens(todoList)
    {
        todoList.forEach(function(task){
            console.log(`Title: ${task.title} - Date: ${task.dueDate} - Status: ${task.status}`);
        });
    }

    async displaySelectItem(todoList)
    {
        const { id } = await inquirer.prompt([
            {
                type: 'list',
                name: 'id',
                message: 'Select a task',
                choices: todoList.map( (task) => ({ name: task.title, value: task.id }) )
            }
        ]);

        return { id };
    }

    async displayEditItem(task)
    {
        const { title, dueDate } = await inquirer.prompt([
            {
                type: 'input',
                name: 'title',
                message: 'Digite o título da todo',
            },
            {
                type: 'input',
                name: 'dueDate',
                message: 'Digite data de vencimento do item',
            }
        ]);

        return { title, dueDate };
    }

    displayLog(text)
    {
        console.log(text);
    }
}