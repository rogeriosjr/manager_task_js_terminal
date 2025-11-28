import { TodoView } from "./view/todo-view.js";
import { TodoListController } from "./controller/todo-controller.js";
import { todoListModel } from "./model/todo.js";

async function main()
{
    const view = new TodoView();
    const model = new todoListModel();
    const controller = new TodoListController(model, view);

    do {
        const { option } = await view.displayMenu();

        switch (option) {
            case 'Add item' :
                await controller.addItem();
                break;
            case 'Listar tarefas' :
                await controller.listTask();
                break;
            case 'Listar da API' :
                await controller.listTaskApi();
                break;
            case 'Marcar como concluída' :
                await controller.completeTask();
                break;
            case 'Completar da API' :
                await controller.completeTaskApi();
                break;
            case 'Edit task' :
                await controller.editTask();
                break;
            case 'Editar da API' :
                await controller.editTaskApi();
                break;
            case 'Delete task' :
                await controller.deleteTask();
                break;
            case 'Deletar da API' :
                await controller.deleteTaskApi();
                break;
            case 'Sair' :
                return;
        }
    }while(true);
}

main();