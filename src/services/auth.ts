import { v4 as uuid } from 'uuid'
import { SignInRequest } from './../types/SignIn'

// delay para simular a espera dos dados retornados do back-end
const delayFakeBackEnd = (amout = 750) => new Promise(resolve => setTimeout(resolve, amout))

// simulando um retorno de back-end de um usuário sendo autenticado
export const signInRequest = async (data: SignInRequest) => {
    await delayFakeBackEnd();

    return {
        token: uuid(),
        user: {
            name: 'David Edson',
            email: 'david.contato.tec@gmail.com',
            avatar: 'https://github.com/DavidEdsonDoNascimento.png'
        }
    }
}

export const recoverUserInformation = async (token: string) => {
    await delayFakeBackEnd();
    return {
        token: token,
        user: {
            name: 'David Edson',
            email: 'david.contato.tec@gmail.com',
            avatar: 'https://github.com/DavidEdsonDoNascimento.png'
        }
    }
}