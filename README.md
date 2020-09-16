# COC

###### Sistema voltado para o gerenciamento de cadastro de pacientes e criação de fichas e prescrições de forma digital.

## Detalhamento de rotas do servidor

_**POST** - Cadastro de usuários:_

**O cadastro é uma rota secreta, que não deve ser acessada por nenhum usuário, por isso possui um password secreto que é enviado pelo headers da aplicação.**

Recurso: `/privileges`

Headers: `Authorization": privileges`

```
{
  "id": "admin",
  "password": "secret",
  "type": 1
}
```

_**POST** - Login:_

Recurso: `/login`

```
{
  "id": "admin",
  "password": "secret"
}
```

_**POST** - Cadastro de pacientes:_

**É necessário enviar no headers da aplicação, o id do usuário logado como forma de segurança.**

Recurso: `/patients`

Headers: `Authorization": admin`

```
{
  "nome": "Jose",
  "cpf": "111.111.222-98",
  "rg": "9222545",
  "data_nascimento": "09/01/1996",
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

_**GET** - Busca de todos os pacientes:_

Recurso: `/patients-all`

Headers: `Authorization: admin`

```
{
  No body
}
```

_**GET** - Busca de paciente por nome:_

**É necessário informar sempre o nome do usuário a ser pesquisado na query, assim como o id do usuário logado, nesse caso no headers.**

Recurso: `/patients-name`

Query: `nome: Jose`
Headers: `Authorization: admin`

```
{
  No body
}
```

_**GET** - Busca de paciente por id:_

Recurso: `/patients/:patient`

Headers: `Authorization: admin`

```
{
  No body
}
```

_**PUT** - Atualização de pacientes:_

Recurso: `/patients/:patient`

Headers: `Authorization: admin`

```
{
  "nome": "Jose",
  "cpf": "222.333.454-96",
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

Recurso: `/patients/:patient`

Headers: `Authorization: admin`

```
{
  No body
}
```

_**POST** - Nova consulta:_

Recurso: `/appointments`

Headers: `Authorization: admin`

```
{
  "tipo": "teste_de_olhinho",
  "patient_id": 1
}
```

_**GET** - Procura de consulta:_

Recurso: `/appointments/:appointment`

Headers: `Authorization: admin`

```
{
  No body
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

_**GET** - Lista de todas consultas do dia:_

Recurso: `/today`

Headers: `Authorization: admin`

```
{
  No body
}
```
_**GET** - Lista de detalhes de uma consulta do dia:_

Recurso: `/today/:appointment`

Headers: `Authorization: admin`

```
{
  No body
}
```

_**DELETE** - Exclusão de today:_

Recurso: `/today/:today`

Headers: `Authorization: admin`

```
{
  No body
}
```

_**POST** - Nova avaliação a partir de uma consulta selecionada:_

**Cada consulta só possui uma única avaliação, porém cada paciente pode ter várias consultas registradas em seu histórico.**

Recurso: `/evaluations`

Headers: `Authorization: admin`

```
{
  "hda": "teste",
  "longe_esferico_od": "teste",
  "longe_esferico_oe": "teste",
  "longe_cilindro_od": "teste",
  "longe_cilindro_oe": "teste",
  "longe_eixo_od": "teste",
  "longe_eixo_oe": "teste",
  "perto_esferico_od": "teste",
  "perto_esferico_oe": "teste",
  "perto_cilindro_od": "teste",
  "perto_cilindro_oe": "teste",
  "perto_eixo_od": "teste",
  "perto_eixo_oe": "teste",
  "avl_od": "teste",
  "avl_oe": "teste",
  "tonometria_od": "teste",
  "tonometria_oe": "teste",
  "biomicroscopia": "teste",
  "fundoscopia": "teste",
  "outros": "teste",
  "consulta_id": 1
}
```

_**GET** - Busca de avaliação:_

Recurso: `/evaluations/:evaluation`

Headers: `Authorization: admin`

```
{
  No body
}
```
