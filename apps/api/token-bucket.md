5. Token Bucket Strategy (controle de requisições)
Cada usuário terá um controle individual de requisições com base em tokens:

Começa com 10 tokens.

Cada requisição consome 1 token.

Se a requisição for bem-sucedida → o token é devolvido.

Se falhar (ex: erro 400, 500, etc) → o token é perdido.

A cada 1 hora, 1 token é adicionado novamente, até no máximo 10 tokens.

Ou seja, funciona como um "balde que vaza devagar", permitindo um número limitado de falhas.