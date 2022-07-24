<p align="center">
  <a href=" https://github.com/frreiro/RepoProvas-API">
    <img src="https://notion-emojis.s3-us-west-2.amazonaws.com/prod/svg-twitter/1f5c3-fe0f.svg" alt="readme-logo" width="80" height="80">
  </a>

  <h3 align="center">
    RepoProvas-API
  </h3>
</p>

## Usage

```bash
$ git clone https://github.com/frreiro/RepoProvas-API

$ cd RepoProvas-API

$ npm install

$ npm run dev
```

API:

```
- POST /sign-up
    - Rota para cadastrar um novo usuário
    - headers: {}
    - body: {
        "email": "lorem@gmail.com",
        "password": "loremipsum",
        "confirmPassword": "loremipsum"
    }
- POST /sign-in
    - Rota para fazer login
    - headers: {}
    - body: {
    "email": "lorem@gmail.com",
    "password": "loremipsum"
    }
- POST /test (autenticada)
    - Rota para criar um teste 
    - headers: { "Authorization": "Bearer $token" }
    - body: {
        "name": "Lorem ipsum dolor sit amet",
        "pdfUrl": "https://loremipsumdolor.pdf"
        "category": "Projeto" | "Prática" | "Recuperação"
        "discipline": "HTML e CSS" | "JavaScript" | "React" | "Humildade" | "Planejamento" | "Autoconfiança"
        "teacher": "Diego Pinho" | "Bruna Hamori"
    }

- GET /test/discipline (autenticada)
    - Rota para receber a lista de testes organizada por disciplinas
    - headers: { "Authorization": "Bearer $token" }
    - body: {}

- GET /test/teachers (autenticada)
    - Rota para receber a lista de testes organizada por professores
    - headers: { "Authorization": "Bearer $token" }
```
