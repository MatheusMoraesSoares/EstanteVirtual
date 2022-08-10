# EstanteVirtual
Estante virtual é um projeto para calcular e definir vencedores em competições. Usando como exemplo as olimpíadas, o programa recebe os dados para serem salvos no banco e, quando solicitado, calcular o ganhador.

# Requisitos executados

* Cadastrar uma competição
* Pegar todas as competições
* Pegar dados de uma competição pelo seu ID
* Pegar vencedor (pode ser o resultado temporário ou definitivo, caso seja definitivo a competição é encerrada e não podem ser adicionados novos competidores).
* Cadastrar Atleta

#Como rodar

* Copiar o link do repositorio 

![image](https://user-images.githubusercontent.com/98968318/183947683-35bde5f3-1d66-41eb-85ad-c34189867c9c.png)
	
* Abrir o seu terminal 

![image](https://user-images.githubusercontent.com/98968318/183948052-ded93277-7206-44b8-bcb5-aa27f6748501.png)
	
* Em seguida digitar: git clone "link"
* Após isso entre na pasta pelo terminal com: cd cube-project (aperte TAB e dê ENTER) 
* Depois digite: npm install
* Após isso entre na documentação e siga os passos.

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
