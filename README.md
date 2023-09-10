# App

Find Friend App.

## RFs (Requesitos Funcionais)
- [ ] Deve ser possível cadastrar um pet;
- [ ] Deve ser possível listar todos os pets disponíveis para adoção;
- [ ] Deve ser possível filtrar os pets por suas características;
- [ ] Deve ser possível visualizar os detalhes de um pet para adoção.
- [ ] Deve ser possível cadastrar uma organização;
- [ ] Deve ser possível fazer login como uma organização;

## RNs(Regras de Negócio)
- [ ] Para listar os pets, obrigatoriamente precisamos informar a cidade
- [ ] Uma ORG precisa ter um endereço e um número de WhatsApp
- [ ] Um pet deve estar ligado a uma ORG
- [ ] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [ ] Todos os filtros, além da cidade, são opcionais
- [ ] Para uma ORG acessar a aplicação como admin, ela precisa estar logada

## NFRs (Non functional requirements)
- [ ] A senha do usuário deve ser enctriptada;
- [ ] A aplicação deve ser persistida em banco POSTGRESQL;
- [ ] O usuário deve ser identificado por um JWT