# EstanteVirtual
Estante virtual é um projeto para calcular e definir vencedores em competições. Usando como exemplo as olimpíadas, o programa recebe os dados para serem salvos no banco e, quando solicitado, calcular o ganhador.

# Requisitos executados

* Cadastrar uma competição
* Pegar todas as competições
* Pegar dados de uma competição pelo seu ID
* Pegar vencedor (pode ser o resultado temporário ou definitivo, caso seja definitivo a competição é encerrada e não podem ser adicionados novos competidores).
* Cadastrar Atleta

#Como rodar

* Seguir a documentação do Postman - https://documenter.getpostman.com/view/20351968/VUxUN5j5

# Modelagem do banco de dados

```CREATE TABLE competicao(
    id VARCHAR(255) PRIMARY KEY,
    competicao VARCHAR(255) NOT NULL,
    unidade ENUM ("s", "m") NOT NULL,
    boolean ENUM ("TRUE", "FALSE") DEFAULT "TRUE"
);

CREATE TABLE atleta(
	nome VARCHAR(255) PRIMARY KEY,
    value VARCHAR(255) NOT NULL,
    competicao VARCHAR(255) NOT NULL,
    FOREIGN KEY(competicao) REFERENCES competicao(id)
);


OBS: O projeto está incompleto, falta a parte de testes automatizados.
