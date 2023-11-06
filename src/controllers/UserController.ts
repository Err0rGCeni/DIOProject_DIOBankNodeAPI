import { Request, Response } from 'express';
import { UserService } from '../services/UserService';

/**
 * Controlador para operações relacionadas a usuários.
 */
export class UserController {
    userService: UserService;

    /**
     * Construtor da classe UserController.
     *
     * @param userService - Uma instância do UserService (opcional).
     */
    constructor(userService = new UserService()) {
        this.userService = userService;
    }

    /**
     * Cria um novo usuário com base nos dados fornecidos na solicitação.
     *
     * @param request - Objeto Request do Express.
     * @param response - Objeto Response do Express.
     * @returns Resposta JSON com status e mensagem.
     */
    createUser = (request: Request, response: Response) => {
        const user = request.body;

        // Verifica se o campo 'name' está ausente nos dados do usuário
        if (!user.name) {
            return response.status(400).json({ message: 'Bad request: Nome obrigatório' });
        }

        if (!user.email) {
            return response.status(400).json({ message: 'Bad request: E-mail obrigatório' });
        }

        // Chama o serviço para criar o usuário com o nome e email fornecidos
        this.userService.createUser(user.name, user.email);

        // Responde com um código 201 (Criado) e uma mensagem
        return response.status(201).json({ message: 'Usuário criado' });
    }

    /**
     * Obtém a lista de todos os usuários.
     *
     * @param request - Objeto Request do Express.
     * @param response - Objeto Response do Express.
     * @returns Resposta JSON com status e lista de usuários.
     */
    getAllUsers = (request: Request, response: Response) => {
        const users = this.userService.getAllUsers();

        // Responde com um código 200 (OK) e a lista de usuários
        return response.status(200).json({ users });
    }

    /**
     * Remove um usuário com base no email fornecido na solicitação.
     *
     * @param request - Objeto Request do Express.
     * @param response - Objeto Response do Express.
     * @returns Resposta JSON com status e mensagem.
     */
    removeUser = (request: Request, response: Response) => {
        const user = request.body;

        if (!user.email) {
            return response.status(400).json({ message: 'Bad request: Email obrigatório' });
        }

        const result = this.userService.removeUser(user.email)

        if (result) {
            return response.status(200).json({ message: 'Usuário deletado' });
        } else {
            return response.status(404).json({ message: 'Usuário não encontrado' });
        }
    }
}
