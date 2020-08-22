# COC

###### Sistema voltado para o gerenciamento de cadastro de pacientes e criação de fichas e prescrições de forma digital.

## Detalhamento de rotas do servidor

_**POST** - Cadastro de usuários:_

**O cadastro é uma rota secreta, que não deve ser acessada por nenhum usuário, por isso possui um password secreto que é enviado pelo headers da aplicação.**

Recurso: `/privileges`

Headers: `{"acess": "privileges"}`

```
{
  "id": "123321456899",
  "password": "secret",
  "type": 1
}
```

_**POST** - Login:_

Recurso: `/login`

```
{
  "id": "123321456899",
  "password": "secret"
}
```

_**POST** - Cadastro de pacientes:_

**É necessário enviar no headers da aplicação, o id do usuário logado como forma de segurança.**

Recurso: `/patients`

Headers: `{"id": "123321456899"}`

```
{
  "cpf": "32132132119",
  "nome": "Joaozin",
  "rg": "9222545",
  "data_nascimento": "09-01-1996",
  "reg": "Nao sei",
  "endereco_rua": "Rua dos beco",
  "endereco_numero": 99,
  "endereco_bairro": "Nao tem",
  "nome_pai": "Zezin",
  "nome_mae": "Zefinha",
  "telefone": "81999999999",
  "email": "teste@teste.com,
  "profissao": "Predrero",
  "data_atendimento": "09-01-2019",
  "convenio": "SUS",
  "antecedentes_pessoais": "Ele bebia cana"
}
```

_**GET** - Procura de pacientes:_

**É necessário informar sempre o CPF do usuário a ser pesquisado na query, assim como o id do usuário logado, nesse caso no headers.**

Recurso: `/patients`

Query: `{"cpf": "32132132119"}`
Headers: `{"id": "123321456899"}`

```
{
  No body
}
```

_**PUT** - Atualização de pacientes:_

**É necessário enviar no headers da aplicação, o id do usuário logado como forma de segurança.**

Recurso: `/patients`

Headers: `{"id": "123321456899"}`

```
{
  "cpf": "32132132119",
  "nome": "Joaozin",
  "rg": "9222545",
  "data_nascimento": "09-01-1996",
  "reg": "Nao sei",
  "endereco_rua": "Rua dos beco",
  "endereco_numero": 99,
  "endereco_bairro": "Nao tem",
  "nome_pai": "Zezin",
  "nome_mae": "Zefinha",
  "telefone": "81999999999",
  "email": "teste@teste.com,
  "profissao": "Predrero",
  "data_atendimento": "09-01-2019",
  "convenio": "SUS",
  "antecedentes_pessoais": "Ele nao bebia cana"
}
```

_**DELETE** - Exclusão de pacientes:_

**É necessário enviar no headers da aplicação, o id do usuário logado como forma de segurança, assim como o cpf do usuário a ser excluido.**

Recurso: `/patients`

Headers: `{"id": "123321456899"}`

```
{
  "cpf": "32132132119"
}
```