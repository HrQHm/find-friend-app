# App

Find Friend App.

## RFs (Requesitos Funcionais)
- [X] Deve ser possível cadastrar um pet;
- [X] Deve ser possível listar todos os pets disponíveis para adoção;
- [X] Deve ser possível filtrar os pets por suas características;
- [X] Deve ser possível visualizar os detalhes de um pet para adoção.
- [X] Deve ser possível cadastrar uma organização;
- [X] Deve ser possível fazer login como uma organização;

## RNs(Regras de Negócio)
- [X] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [X] Uma ORG precisa ter um endereço e um número de WhatsApp
- [X] Um pet deve estar ligado a uma ORG
- [X] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## NFRs (Non functional requirements)
- [X] A senha do usuário deve ser enctriptada;
- [X] A aplicação deve ser persistida em banco POSTGRESQL;
- [ ] O usuário deve ser identificado por um JWT