import { UserController } from "./UserController";
import { User, UserService } from "../services/UserService";
import { Request } from "express";
import { makeMockResponse } from "../__mocks__/mockResponse.mock";

describe('UserController', () => {
    const mockDb: User[] = [
        {
            name: "defaultUser",
            email: "defaultuser@mail.com"
        }
    ]

    const mockUserService = new UserService(mockDb)
    mockUserService.getAllUsers = jest.fn();

    const userController = new UserController(mockUserService);

    it('Deve adicionar um novo usuário', () => {
        const mockRequest = {
            body: {
                name: 'Testy',
                email: 'testy@email.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(201)
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário criado' })
    })

    it('Deve retornar um erro se o campo "name" não for informado', () => {
        const mockRequest = {
            body: {
                email: 'testy@email.com'
            }
        } as Request

        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: Nome obrigatório' })
    })

    it('Deve retornar um erro se o campo "email" não for informado', () => {
        const mockRequest = {
            body: {
                name: 'Testy',
            }
        } as Request

        const mockResponse = makeMockResponse()

        userController.createUser(mockRequest, mockResponse)

        expect(mockResponse.state.status).toBe(400)
        expect(mockResponse.state.json).toMatchObject({ message: 'Bad request: E-mail obrigatório' })
    })

    it('Deve chamar a função getAllUsers do UserService', () => {
        const mockRequest = {} as Request
        const mockResponse = makeMockResponse()

        // Chama a função getAllUsers do UserController
        userController.getAllUsers(mockRequest, mockResponse)

        // Verifica se a função getAllUsers do UserService foi chamada.
        expect(mockUserService.getAllUsers).toHaveBeenCalled()
    })

    it('Deve deletar um usuário existente', () => {
        const mockRequest = {
            body: {
                email: 'defaultuser@mail.com',
            }
        } as Request;

        const mockResponse = makeMockResponse();

        userController.removeUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(200);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário deletado' });
    });

    it('Deve retornar um erro ao tentar deletar um usuário inexistente', () => {
        const mockRequest = {
            body: {
                email: 'usuarioinexistente@example.com',
            }
        } as Request;

        const mockResponse = makeMockResponse();

        userController.removeUser(mockRequest, mockResponse);

        expect(mockResponse.state.status).toBe(404);
        expect(mockResponse.state.json).toMatchObject({ message: 'Usuário não encontrado' });
    });
})
