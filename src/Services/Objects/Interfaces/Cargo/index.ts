export default interface Cargo {
    id: number;
    nome: string;
    dataDeInicio?: Date | undefined;
    dataDeTermino?: Date | undefined;
}