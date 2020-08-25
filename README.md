# COC

###### Sistema voltado para o gerenciamento de cadastro de pacientes e criação de fichas e prescrições de forma digital.

## Detalhamento de rotas do servidor

_**POST** - Cadastro de usuários:_

**O cadastro é uma rota secreta, que não deve ser acessada por nenhum usuário, por isso possui um password secreto que é enviado pelo headers da aplicação.**

Recurso: `/privileges`

Headers: `{"Authorization": "privileges"}`

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

Headers: `{"Authorization": 123321456899}`

```
{
  "cpf": 32132132119,
  "nome": "Joaozin",
  "rg": "9222545",
  "data_nascimento": "09-01-1996",
  "idade": 30,
  "reg": "Nao sei",
  "rua": "Rua dos beco",
  "numero": 99,
  "bairro": "Nao tem",
  "nome_pai": "Zezin",
  "nome_mae": "Zefinha",
  "telefone": "81999999999",
  "email": "teste@teste.com",
  "profissao": "Predrero",
  "convenio": "SUS",
  "antecedentes_pessoais": "Ele bebia cana"
}
```

_**GET** - Procura de pacientes:_

**É necessário informar sempre o CPF do usuário a ser pesquisado na query, assim como o id do usuário logado, nesse caso no headers.**

Recurso: `/patients`

Query: `{"cpf": 32132132119}`
Headers: `{"Authorization": 123321456899}`

```
{
  No body
}
```

_**PUT** - Atualização de pacientes:_

Recurso: `/patients`

Headers: `{"Authorization": 123321456899}`

```
{
  "cpf": 32132132119,
  "nome": "Joaozin",
  "rg": "9222545",
  "data_nascimento": "09-01-1996",
  "idade": 30,
  "reg": "Nao sei",
  "rua": "Rua dos beco",
  "numero": 99,
  "bairro": "Nao tem",
  "nome_pai": "Zezin",
  "nome_mae": "Zefinha",
  "telefone": "81999999999",
  "email": "teste@teste.com",
  "profissao": "Predrero",
  "convenio": "SUS",
  "antecedentes_pessoais": "Ele nao bebia cana"
}
```

_**DELETE** - Exclusão de pacientes:_

**É necessário enviar no headers da aplicação, o id do usuário logado como forma de segurança, assim como o cpf do usuário a ser excluido.**

Recurso: `/patients`

Headers: `{"Authorization": 123321456899}`

```
{
  "cpf": 32132132119
}
```

_**POST** - Nova consulta:_

Recurso: `/consulta`

Headers: `{"Authorization": 123321456899}`

```
{
  "tipo": "teste_de_olhinho",
  "patient_id": 32132132119
}
```

_**GET** - Procura de consulta:_

Recurso: `/consulta`

Headers: `{"Authorization": 123321456899}`

```
{
  "id": 32132132119
}
```

_**PUT** - Atualização de consulta:_

Recurso: `/consulta`

Headers: `{"Authorization": 123321456899}`

```
{
  "consulta_id": 1,
  "tipo": "teste_de_olhinho"
}
```

_**DELETE** - Exclusão de consulta:_

Recurso: `/consulta`

Headers: `{"Authorization": 123321456899}`

```
{
  "consulta_id": 1
}
```

_**POST** - Replace today:_

Recurso: `/today`

Headers: `{"Authorization": 123321456899}`

```
{
  "today": 2
}
```

_**GET** - Lista de today:_

Recurso: `/today`

Headers: `{"Authorization": 123321456899}`

```
{
  No body
}
```

_**DELETE** - Exclusão de today:_

Recurso: `/today`

Headers: `{"Authorization": 123321456899}`

```
{
  "today": 1
}
```

_**POST** - Nova avaliacao:_

Recurso: `/avaliacao`

Headers: `{"Authorization": 123321456899}`

```
{
  "avl_olho_direito": "teste",
  "avl_olho_esquerdo": "teste",
  "hda": "teste",
  "tonometria_olho_direito": "teste",
  "tonometria_olho_esquerdo": "teste",
  "inspecao": "teste",
  "inspecao_ppc": "teste",
  "refracao_olho_direito": "teste",
  "refracao_olho_esquerdo": "teste",
  "refracao_olho_direito_esferico": "teste",
  "refracao_olho_esquerdo_esferico": "teste",
  "refracao_olho_direito_cilindro": "teste",
  "refracao_olho_esquerdo_cilindro": "teste",
  "refracao_olho_direito_eixo": "teste",
  "refracao_olho_esquerdo_eixo": "teste",
  "refracao_olho_direito_adicao": "teste",
  "refracao_olho_esquerdo_adicao": "teste",
  "dp": "teste",
  "biomicroscopia": "teste",
  "fungoscopia": "teste",
  "consulta_id": 1
}
```

_**GET** - Procura de avaliacao:_

Recurso: `/avaliacao`

Headers: `{"Authorization": 123321456899}`

```
{
  "id": 1
}
```

_**PUT** - Atualização de avaliacao:_

Recurso: `/avaliacao`

Headers: `{"Authorization": 123321456899}`

```
{
  "avaliacao_id": 1,
  "avl_olho_direito": "teste",
  "avl_olho_esquerdo": "teste",
  "hda": "teste",
  "tonometria_olho_direito": "teste",
  "tonometria_olho_esquerdo": "teste",
  "inspecao": "teste",
  "inspecao_ppc": "teste",
  "refracao_olho_direito": "teste",
  "refracao_olho_esquerdo": "teste",
  "refracao_olho_direito_esferico": "teste",
  "refracao_olho_esquerdo_esferico": "teste",
  "refracao_olho_direito_cilindro": "teste",
  "refracao_olho_esquerdo_cilindro": "teste",
  "refracao_olho_direito_eixo": "teste",
  "refracao_olho_esquerdo_eixo": "teste",
  "refracao_olho_direito_adicao": "teste",
  "refracao_olho_esquerdo_adicao": "teste",
  "dp": "teste",
  "biomicroscopia": "teste",
  "fungoscopia": "teste1"
}
```