import inquirer from "inquirer";

let todoList = [];

async function addItem() {
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

    todoList.push(
        { title, dueDate, status: 'pending', id: Date.now() }
    );

    console.log(`\nItem ${title} adicionado\n`);
}

async function listTask() {
    todoList.forEach(function(task){
        console.log(`Title: ${task.title} - Date: ${task.dueDate} - Status: ${task.status}`);
    });
}

async function completeTask() {
    if(!todoList.length) {
        console.log('\nNenhuma tarefa encontrada\n');
        return;
    }

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'What task do you want to complete?',
            choices: todoList.map( (task) => ({ name: task.title, value: task.id }) )
        }
    ]);

    const task = todoList.find( (task) => task.id === id );
    task.status = 'done';
    console.log(`\nTarefa ${task.title} marcada como concluída!\n`);
}

async function editTask() {
    if(!todoList.length) {
        console.log('Nenhuma tarefa encontrada');
        return;
    }

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'What task do you want edit?',
            choices: todoList.map( (task) => ({ name: task.title, value: task.id }) )
        }
    ]);

    const task = todoList.find( (task) => task.id === id );

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

    task.title = title;
    task.dueDate = dueDate;

    console.log(`\nTarefa ${title} editada com sucesso! \n`);
}

async function deleteTask() {
    if(!todoList.length) {
        console.log('Nenhuma tarefa encontrada');
        return;
    }

    const { id } = await inquirer.prompt([
        {
            type: 'list',
            name: 'id',
            message: 'What task do you want delete?',
            choices: todoList.map( (task) => ({ name: task.title, value: task.id }) )
        }
    ]);
    
    const task = todoList.find( (task) => task.id === id );

    todoList = todoList.filter( (task) => task.id !== id );

    console.log(`\nTask ${task.title} deleted with success!\n`);
}

async function main() {
    do {
        const { option } = await inquirer.prompt([
            {
                type: 'list',
                name: 'option',
                message: 'Choice an option:',
                choices: [
                    'Add item',
                    'Listar tarefas',
                    'Marcar como concluída',
                    'Edit task',
                    'Delete task',
                    'Sair'
                ]
            }
        ]);

        switch (option) {
            case 'Add item' :
                await addItem();
                break;
            case 'Listar tarefas' :
                await listTask();
                break;
            case 'Marcar como concluída' :
                await completeTask();
                break;
            case 'Edit task' :
                await editTask();
                break;
            case 'Delete task' :
                await deleteTask();
                break;
            case 'Sair' :
                return;
        }
    }while(true);
 }

main();