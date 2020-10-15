# :white_check_mark: Criação de matrículas (create enrollment and notify responsible)

**RF**

- [x] O usuário deve poder criar uma matrícula informando os dados dos responsáveis financeiro e solidário, os dados do aluno e a turma desejada;
- [x] O usuário deve poder buscar por um responsável já cadastrado através de seu CPF;
- [x] O usuário deve poder reutilizar um responsável já cadastrado previamente através de seu id;
- [x] O usuário deve poder receber um e-mail informando que seu pedido de matrícula foi recebido e será processado;

**RNF**

- [x] Utilizar o Ethereal para envios de e-mail em ambiente de desenvolvimento;
- [x] Utilizar handlebars como template engine para estilizar o e-mail
- [x] Devem ser criadas as seguintes tabelas:
    - 1. Aluno;
    - 2. Contrato (entre o aluno e a turma);
    - 3. Responsável (uma entrada para cada responsável novo);
    - 4. Relacionamento (entre o responsável e o aluno; uma entrada para cada responsável);
    - 5. Acordo (entre o responsável e o contrato; uma entrada para cada responsável);

**RN**

- [x] O usuário não deve poder visualizar informações sensíveis do responsável buscado, somente seu nome;
- [x] O usuário não deve poder cadastrar dois responsáveis do mesmo tipo;
- [x] O usuário não deve poder cadastrar responsáveis com o mesmo e-mail, cpf ou rg;
- [x] O usuário não deve poder cadastrar um responsável com e-mail, cpf ou rg que já estão em uso;
- [x] O usuário não deve poder cadastrar um aluno em uma turma que não existe;
- [x] O usuário não deve poder reutilizar um responsável que não existe;

# Aprovação/Reprovação de matrículas (aproove or disaproove enrollment and notify responsible)

**RF**

- [x] O usuário deve poder listar todas as matrículas que estão em análise ou pendente;
- [x] O usuário deve poder visualizar todos os dados referentes a uma matrícula;
- [x] O usuário deve poder atualizar todos os dados referentes a uma matrícula;
    - 1. [x] Dados do aluno.
    - 2. [x] Dados de cada um dos responsáveis;
    - 3. [x] Turma desejada;
- [x] O usuário deve poder aprovar uma matrícula informando o id do contrato, um comentário opcional e um contato de e-mail opcional;
- [x] O usuário deve poder desaprovar uma matrícula informando o id do contrato, um comentário opcional e um contato de e-mail opcional;
- [x] O sistema deve poder, caso a matrícula seja aprovada, gerar um novo débito referente à primeira parcela da matrícula;
- [x] O usuário deve poder receber um e-mail informando se sua matrícula foi aprovada ou não, contento o comentário tecido pelo agente que aprovou e contendo o valor do débito caso tenha sido aprovada;
- [ ] **!** Deixar o template bonito e com dados pertinentes

**RNF**

- [ ] A lista de matrículas deve ser armazenada em cache;
- [x] Utilizar o Ethereal para envios de e-mail em ambiente de desenvolvimento;

**RN**

- [x] O usuário não deve poder listar matrículas que não estejam com status de análise ou de pendência;
- [ ] Ao buscar as entradas no banco, apenas os dados essenciais de exibição devem ser baixados;
- [x] O usuário não deve poder visualizar os dados de uma matrícula que não existe;
- [x] O usuário não deve poder atualizar os dados de uma matrícula que não existe;
- [x] O usuário não deve poder atualizar os dados de uma matrícula sem seguir as mesmas regras de criação;
- [x] O usuário não deve poder aprovar ou desaprovar uma matrícula que não existe;
- [x] O usuário não deve poder aprovar ou desaprovar uma matrícula se não informar qual das duas operações deseja realizar;
- [x] O usuário não deve poder aprovar ou desaprovar um contrato que já foi aprovado ou que já está ativo


**CHANGES**
- [x] Dia de pagamento

# :white_check_mark: Atualização de fotos do responsável (update responsible photos and delete the previous ones)

**RF**

- [x] O usuário deve poder atualizar as fotos do responsável através de seu id;

**RNF**

- [x] As fotos devem ser armazenadas em disco em ambiente de desenvolvimento;

**RN**

- [x] As fotos devem ser substituídas caso novas fotos sejam enviadas;

# :white_check_mark: Atualização de fotos do aluno (update student photos and delete the previous ones)

**RF**

- [x] O usuário deve poder atualizar as fotos do aluno através de seu id;

**RNF**

- [x] As fotos devem ser armazenadas em disco em ambiente de desenvolvimento;

**RN**

- [x] As fotos devem ser substituídas caso novas fotos sejam enviadas;

# Pagamento de débitos (create a new payment and change debit's paid field to true)

**RF**

- [x] O usuário deve poder listar todos os contratos que estão aprovados;
- [ ] **!** O usuário deve pode buscar por um contrato pelo nome do aluno;
- [x] O usuário deve poder listar todos os débitos referentes a um contrato aprovado, cujo valor é baseado no valor base do débito e nas aplicaçõs de desconto ou juros;
    - [ ] **!** Desconto e juros;
- [x] O usuário deve poder pagar qualquer débito selecionando um método de pagamento;
    - [ ] **!** Desconto e juros;
- [x] O usuário deve poder receber um recibo informando que o débito foi pago;
- [ ] Caso o débito seja referente à primeira parcela de matrícula, a matrícula deverá receber o status de ativa;
- [ ] Caso o débito seja referente à primeira parcela de matrícula, o aluno e cada um dos responsáveis ligados ao contrato deverão receber um usuário de acesso com perfil estático;
- [ ] Caso o débito seja referente à primeira parcela de matrícula, cada um dos responsáveis ligados ao contrato deverá receber um e-mail contendo o nome de usuário e a senha de acesso seu e do aluno;
- [ ] Formatar o débito para ficar apresentável

**RNF**

- [ ] A lista de contratos deve ser armazenada em cache;
- [x] O recibo deve ser gerado como um arquivo de texto;
- [x] O recibo deve ser armazenado em disco em ambiente de desenvolvimento;

**RN**

- [x] O usuário não deve poder listar débitos de um contrato inexistente;
- [x] O usuário não deve poder listar débitos de um contrato que não foi aprovado;
- [x] O usuário não deve poder pagar um débito se não estiver logado no sistema;
- [x] O usuário não deve poder pagar um débito inexistente;
- [x] O usuário não deve poder pagar um débito que já foi pago;
- [x] O usuário não deve poder pagar um débito com um método de pagamento inválido;

# Recebimento de pagamentos (create a new discharge and change payment's discharged field to true)

**RF**

- [x] O usuário deve poder listar todos os pagamentos que já foram realizados e que não foram recebidos;
- [x] O usuário deve poder receber um pagamento;

**RNF**

- [ ] A lista de pagamentos deve ser armazenada em cache;

**RN**

- [x] O usuário não deve poder listar os pagamentos que já foram recebidos;
- [x] O usuário não deve poder receber um pagamento se não estiver logado no sistema;
- [x] O usuário não deve poder receber um pagamento que não existe;
- [x] O usuário não deve poder receber um pagamento que já foi recebido;

# CRUD de turmas (create, update and list grades)

**RF**

- [x] O usuário deve poder criar uma turma atráves do nome, ano e valor;
- [x] O usuário deve poder listar as turmas existentes;
- [x] O usuário deve poder visualizar todos os dados referentes a uma determinada turma;
- [x] O usuário deve poder atualizar todos os dados referentes a uma determinada turma;

**RNF**

- [ ] A lista de turmas deve ser armazenada em cache;

**RN**

- [x] O usuário não deve poder criar uma turma com o conjunto nome e ano igual ao de outra turma;
- [x] O usuário não deve poder visualizar os dados de uma turma que não existe;
- [x] O usuário não deve poder atualizar uma turma que não existe;
- [x] O usuário não deve poder atualizar uma turma com o conjunto nome e ano igual ao de outra turma;

# CRUD de perfis

**RF**

- [x] O usuário deve poder criar uma perfil atráves do nome e permissões;
- [x] O usuário deve poder listar os perfis existentes;
- [x] O usuário deve poder atualizar todos os dados referentes a um determinado perfil;

**RNF**

- [ ] A lista de perfis deve ser armazenada em cache;

**RN**

- [x] O usuário não deve poder criar um perfil com nome igual ao de outro perfil;
- [x] O usuário não deve poder atualizar um perfil que não existe;
- [x] O usuário não deve poder atualizar um perfil com nome igual ao de outro perfil;

# CRUD de usuários

**RF**

- [x] O usuário deve poder criar um usuário atráves do nome de usuário, senha e perfil;
- [x] O usuário deve poder listar os usuários existentes;
- [x] O usuário deve poder visualizar o nome de usuário e perfil referentes a um determinado usuário;
- [x] O usuário deve poder atualizar todos os dados referentes a um determinado usuário;

**RNF**

- [ ] A lista de usuários deve ser armazenada em cache;
- [x] A senha do usuário deve ser encriptada usando o jbcrypt;

**RN**

- [x] O usuário não deve poder criar um usuário com nome de usuário igual ao de outro usuário;
- [x] O usuário não deve poder criar um usuário com um perfil inexistente;
- [x] O sistema deve encriptar a senha do usuário;
- [x] O usuário não deve poder visualizar os dados de um usuário que não existe;
- [x] O usuário não deve poder atualizar um usuário que não existe;
- [x] O usuário não deve poder atualizar um usuário com nome de usuário igual ao de outro usuário;
- [x] O usuário não deve poder atualizar um usuário com um perfil inexistente;

# Autenticação de usuários

**RF**

- [x] O usuário deve poder acessar o sistema informando seu nome de usuário e senha;
- [x] O usuário deve poder receber um token de acesso contendo as suas permissões de acesso, as quais são definidas pelo perfil atribuído ao usuário;

**RNF**

- [x] O token de acesso deve ser gerado usando o jsonwebtoken;

**RN**

- [x] O usuário não deve poder acessar o sistema caso não esteja cadastrado no sistema;
- [x] O usuário não deve poder acessar o sistema caso suas credenciais estejam incorretas;
- [ ] O usuário não deve poder acessar funcionalidades do sistema cujo perfil não lhe dá permissão;

# General tasks
- [x] Método para atualizar turma do contrato precisa ser revisado
- [x] Criar campo de recibo na tabela de pagamentos e devolver o pagamento como response após criá-lo
- [x] Configurar providers com variáveis de ambiente
- [x] Implementar class transformer para ocultar senhas e exibir urls
- [ ] Implementar celebrate para filtrar dados vindos do front-end
- [ ] Implementar express rate limit para evitar ataques de brute force
