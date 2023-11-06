import { User, UserService } from "./UserService";

describe('UserService', () => {
    const mockDb: User[] = []
    const userService = new UserService(mockDb);

    it('Deve adicionar um novo usuário', () => {
        const mockConsole = jest.spyOn(global.console, 'log');
        userService.createUser('nath', 'nath@test.com');
        expect(mockConsole).toHaveBeenCalledWith('DB atualizado', mockDb);
    });

    it('Deve obter todos os usuários', () => {
        const users = userService.getAllUsers();
        expect(users).toEqual(mockDb);
    });

    it('Deve remover um usuário existente', () => {
        userService.createUser('alice', 'alice@example.com');
        const userToRemove = mockDb[0];
        const result = userService.removeUser(userToRemove.email);
        expect(result).toBe(true);
    });

    it('Deve retornar falso ao remover um usuário inexistente', () => {
        const result = userService.removeUser('inexistent@example.com');
        expect(result).toBe(false);
    });
});
