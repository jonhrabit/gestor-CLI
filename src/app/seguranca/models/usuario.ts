export interface Usuario {
    id: number,
    cadastro: Date,
    nome: string,
    username: string,
    password: string,
    setor: string,
    email: string,
    cpf: string,
    permissoes: string[]
}
