# General tasks

-   [x] Implementar class transformer para ocultar senhas e exibir urls;
-   [x] Implementar express rate limit para evitar ataques de brute force;
-   [x] Configurar variáveis de ambiente;
-   [x] As listas de contratos devem ser armazenadas em cache;
-   [x] Utilizar o Ethereal para envios de e-mail em ambiente de desenvolvimento;
-   [x] Utilizar o Amazon SES para envios de e-mail em ambiente de produção;
-   [x] Utilizar handlebars como template engine para estilizar os e-mails;
-   [x] Utilizar o disco para para salvar arquivos em ambiente de desenvolvimento;
-   [x] Utilizar o Amazon S3 para salvar arquivos em ambiente de produção;
-   [x] Implementar celebrate para filtrar dados vindos do front-end;
-   [x] Sanitizar dados;

# :white_check_mark: Criação de matrículas

**RF**

-   [x] O usuário deve poder criar uma matrícula informando os dados dos responsáveis financeiro e solidário, os dados do aluno e a turma desejada;
-   [x] O usuário deve poder buscar por um responsável já cadastrado através de seu CPF;
-   [x] O usuário deve poder reutilizar um responsável já cadastrado previamente através de seu id;
-   [x] O usuário deve poder receber um e-mail informando que seu pedido de matrícula foi recebido e será processado;

**RNF**

-   [x] Devem ser criadas as seguintes tabelas:
    -   1. Aluno;
    -   2. Contrato (entre o aluno e a turma);
    -   3. Responsável (uma entrada para cada responsável novo);
    -   4. Relacionamento (entre o responsável e o aluno; uma entrada para cada responsável);
    -   5. Acordo (entre o responsável e o contrato; uma entrada para cada responsável);

**RN**

-   [x] O usuário não deve poder visualizar informações sensíveis do responsável buscado, somente seu nome;
-   [x] O usuário não deve poder cadastrar dois responsáveis do mesmo tipo;
-   [x] O usuário não deve poder cadastrar responsáveis com o mesmo e-mail, cpf ou rg;
-   [x] O usuário não deve poder cadastrar um responsável com e-mail, cpf ou rg que já estão em uso;
-   [x] O usuário não deve poder cadastrar um aluno em uma turma que não existe;
-   [x] O usuário não deve poder reutilizar um responsável que não existe;

# :white_check_mark: Aprovação/Reprovação de matrículas

**RF**

-   [x] O usuário deve poder listar todas as turmas;
-   [x] O usuário deve poder listar todas as matrículas que estão em análise ou pendente na turma selecionada;
-   [x] O usuário deve poder visualizar todos os dados referentes a uma matrícula;
-   [x] O usuário deve poder atualizar todos os dados referentes a uma matrícula;
    -   [x] Dados do aluno.
    -   [x] Dados de cada um dos responsáveis;
    -   [x] Turma desejada;
-   [x] O usuário deve poder aprovar uma matrícula;
-   [x] O usuário deve poder desaprovar uma matrícula;
-   [x] O sistema deve poder, caso a matrícula seja aprovada, gerar um novo débito referente à primeira parcela da matrícula;
-   [x] O usuário deve poder receber um e-mail informando se sua matrícula foi aprovada ou não, contento o comentário tecido pelo agente que aprovou e contendo o valor do débito caso tenha sido aprovada;

**RN**

-   [x] O usuário não deve poder listar matrículas que não estejam com status de análise ou de pendência;
-   [x] Ao buscar as entradas no banco, apenas os dados essenciais de exibição devem ser baixados;
-   [x] O usuário não deve poder visualizar os dados de uma matrícula que não existe;
-   [x] O usuário não deve poder atualizar os dados de uma matrícula que não existe;
-   [x] O usuário não deve poder atualizar os dados de uma matrícula sem seguir as mesmas regras de criação;
-   [x] O usuário não deve poder aprovar ou desaprovar uma matrícula que não existe;
-   [x] O usuário não deve poder aprovar ou desaprovar uma matrícula se não informar qual das duas operações deseja realizar;
-   [x] O usuário não deve poder aprovar ou desaprovar um contrato que já foi aprovado ou que já está ativo;
-   [x] O usuário não deve poder atualizar os dados de um contrato que já foi aprovado;

# :white_check_mark: Atualização de fotos do responsável

**RF**

-   [x] O usuário deve poder atualizar as fotos do responsável através de seu id;

**RN**

-   [x] O usuário não deve poder atualizar as fotos de um responsável que não existe;
-   [x] As fotos devem ser substituídas caso novas fotos sejam enviadas;

# :white_check_mark: Atualização de fotos do aluno

**RF**

-   [x] O usuário deve poder atualizar as fotos do aluno através de seu id;

**RN**

-   [x] O usuário não deve poder atualizar as fotos de um aluno que não existe;
-   [x] As fotos devem ser substituídas caso novas fotos sejam enviadas;

# :white_check_mark: Pagamento de débitos

**RF**

-   [x] O usuário deve poder listar todos os contratos que estão aprovados;
-   [x] O usuário deve poder buscar por um contrato pelo nome do aluno;
-   [x] O usuário deve poder listar todos os débitos referentes a um contrato aprovado;
-   [x] O usuário deve poder pagar qualquer débito selecionando um método de pagamento;
-   [x] O usuário deve poder receber um recibo informando que o débito foi pago;
-   [x] Caso o débito seja referente à primeira parcela de matrícula, a matrícula deverá receber o status de ativa;
-   [x] Caso o débito seja referente à primeira parcela de matrícula, o aluno e cada um dos responsáveis ligados ao contrato deverão receber um usuário de acesso com perfil estático;
-   [x] Caso o débito seja referente à primeira parcela de matrícula, cada um dos responsáveis ligados ao contrato deverá receber um e-mail contendo o nome de usuário e a senha de acesso seu e do aluno;
-   [x] Caso o débito seja referente à primeira parcela de matrícula, as outras 11 parcelas deverão ser geradas, de modo que recebam o desconto aplicado ao contrato;
-   [x] Caso o débito seja pago antes da data limite de desconto, o desconto será aplicado;
-   [x] Caso o débito seja pago após a data limite de desconto, o desconto não será aplicado;
-   [x] Caso o débito seja pago após a data limite de pagamento, o desconto não será aplicado e juros serão aplicados;

**RNF**

-   [x] O recibo deve ser gerado como um arquivo de texto;

**RN**

-   [x] O usuário não deve poder listar débitos de um contrato inexistente;
-   [x] O usuário não deve poder listar débitos de um contrato que não foi aprovado;
-   [x] O usuário não deve poder pagar um débito se não estiver logado no sistema;
-   [x] O usuário não deve poder pagar um débito inexistente;
-   [x] O usuário não deve poder pagar um débito que já foi pago;
-   [x] O usuário não deve poder pagar um débito com um método de pagamento inválido;
-   [x] A data limite do desconto deve ser o dia 10 de cada mês ou o dia útil imediatamente posterior ao dia 10;

# :white_check_mark: Recebimento de pagamentos

**RF**

-   [x] O usuário deve poder listar todos os pagamentos que já foram realizados e que não foram recebidos;
-   [x] O usuário deve poder receber um pagamento;

**RNF**

-   [x] Os contratos ativos deverão ser armazenadas em cache;

**RN**

-   [x] O usuário não deve poder listar os pagamentos que já foram recebidos;
-   [x] O usuário não deve poder receber um pagamento se não estiver logado no sistema;
-   [x] O usuário não deve poder receber um pagamento que não existe;
-   [x] O usuário não deve poder receber um pagamento que já foi recebido;

# :white_check_mark: CRUD de turmas

**RF**

-   [x] O usuário deve poder criar uma turma atráves do nome, ano e valor;
-   [x] O usuário deve poder listar as turmas existentes;
-   [x] O usuário deve poder visualizar todos os dados referentes a uma determinada turma;
-   [x] O usuário deve poder atualizar todos os dados referentes a uma determinada turma;

**RNF**

-   [x] A lista de turmas deve ser armazenada em cache;

**RN**

-   [x] O usuário não deve poder criar uma turma com o conjunto nome e ano igual ao de outra turma;
-   [x] O usuário não deve poder visualizar os dados de uma turma que não existe;
-   [x] O usuário não deve poder atualizar uma turma que não existe;
-   [x] O usuário não deve poder atualizar uma turma com o conjunto nome e ano igual ao de outra turma;

# :white_check_mark: CRUD de perfis

**RF**

-   [x] O usuário deve poder criar uma perfil atráves do nome e permissões;
-   [x] O usuário deve poder listar os perfis existentes;
-   [x] O usuário deve poder atualizar todos os dados referentes a um determinado perfil;

**RNF**

-   [x] A lista de perfis deve ser armazenada em cache;

**RN**

-   [x] O usuário não deve poder criar um perfil com nome igual ao de outro perfil;
-   [x] O usuário não deve poder atualizar um perfil que não existe;
-   [x] O usuário não deve poder atualizar um perfil com nome igual ao de outro perfil;

# :white_check_mark: CRUD de usuários

**RF**

-   [x] O usuário deve poder criar um usuário atráves do nome de usuário, senha e perfil;
-   [x] O usuário deve poder listar os usuários existentes;
-   [x] O usuário deve poder visualizar o nome de usuário e perfil referentes a um determinado usuário;
-   [x] O usuário deve poder atualizar todos os dados referentes a um determinado usuário;

**RNF**

-   [x] A lista de usuários deve ser armazenada em cache;
-   [x] A senha do usuário deve ser encriptada usando o jbcrypt;

**RN**

-   [x] O usuário não deve poder criar um usuário com nome de usuário igual ao de outro usuário;
-   [x] O usuário não deve poder criar um usuário com um perfil inexistente;
-   [x] O sistema deve encriptar a senha do usuário;
-   [x] O usuário não deve poder visualizar os dados de um usuário que não existe;
-   [x] O usuário não deve poder atualizar um usuário que não existe;
-   [x] O usuário não deve poder atualizar um usuário com nome de usuário igual ao de outro usuário;
-   [x] O usuário não deve poder atualizar um usuário com um perfil inexistente;

# :white_check_mark: Autenticação de usuários

**RF**

-   [x] O usuário deve poder acessar o sistema informando seu nome de usuário e senha;
-   [x] O usuário deve poder receber um token de acesso contendo as suas permissões de acesso, as quais são definidas pelo perfil atribuído ao usuário;

**RNF**

-   [x] O token de acesso deve ser gerado usando o jsonwebtoken;

**RN**

-   [x] O usuário não deve poder acessar o sistema caso não esteja cadastrado no sistema;
-   [x] O usuário não deve poder acessar o sistema caso suas credenciais estejam incorretas;
-   [x] O usuário não deve poder acessar funcionalidades do sistema cujo perfil não lhe dá permissão;

# :white_check_mark: Criação de débitos adicionais

**RF**

-   [x] O usuário deve poder visualizar todas as turmas existentes;
-   [x] O usuário deve poder selecionar uma turma;
-   [x] O usuário deve poder visualizar todos os contratos ativos de uma turma;
-   [x] O usuário deve poder selecionar um ou mais contratos;
-   [x] O usuário deve poder criar um débito para cada contrato selecionado;

**RNF**

-   [x] Os débitos criados pelo usuário deve ser do tipo 'extra';
-   [x] Os contratos ativos deverão ser armazenadas em cache;

**RN**

-   [x] O usuário não deve poder criar um débito para um contrato que não existe;
-   [x] O usuário não deve poder criar um débito para um contrato que não está ativo;
-   [x] O usuário não deve poder criar um débito com uma data limite que já passou;
-   [x] O usuário não deve poder criar um débito com um valor negativo;
-   [x] O usuário não deve poder criar um débito com um desconto negativo;

# :white_check_mark: CRUD de débitos

**RF**

-   [x] O usuário deve poder visualizar todas as turmas existentes;
-   [x] O usuário deve poder selecionar uma turma;
-   [x] O usuário deve poder visualizar todos os contratos ativos de uma turma;
-   [x] O usuário deve poder pesquisar um contrato pelo nome do aluno;
-   [x] O usuário deve poder selecionar um contrato;
-   [x] O usuário deve poder visualizar todos os débitos do tipo 'extra' de uma contrato que ainda não foram pagos;
-   [x] O usuário deve poder selecionar um débito;
-   [x] O usuário deve poder editar um débito;
-   [x] O usuário deve poder remover o débito;

**RN**

-   [x] O usuário não deve poder remover um débito que não existe;
-   [x] O usuário não deve poder remover um débito que já foi pago;
-   [x] O usuário não deve poder remover um débito que não seja do tipo 'extra';
-   [x] O usuário não deve poder editar um débito que não existe;
-   [x] O usuário não deve poder editar um débito que já foi pago;
-   [x] O usuário não deve poder editar um débito que não seja do tipo 'extra';
-   [x] O usuário não deve poder editar um débito com uma data limite que já passou;
-   [x] O usuário não deve poder editar um débito com um valor negativo;
-   [x] O usuário não deve poder editar um débito com um desconto negativo;
-   [x] Os contratos aprovados deverão ser armazenadas em cache;

# :white_check_mark: Gerar documentos em PDF

**RF**

-   [x] O usuário deve poder gerar os documentos de contrato, ficha de matrícula e checklist a partir do id do contrato;

**RNF**

-   [x] Se um novo arquivo for gerado para o mesmo contrato, o anteriror deve ser excluído;

**RN**

-   [x] O usuário não deve poder gerar documentos para um contrato inválido;

# Issues

-   [x] Método para atualizar turma do contrato precisa ser revisado;
-   [x] Criar campo de recibo na tabela de pagamentos e devolver o pagamento como response após criá-lo;
    -   [x] Devolvê-lo como objeto e com URL;
-   [x] Configurar providers com variáveis de ambiente;
-   [x] Filtrar dados retornados na listagem de pagamentos não descarregados;
-   [x] Atualizar campo de education level para enum
-   [x] Atualizar campo de income_tax para default false
-   [x] Integridade dos dados na criação de matrícula
-   [x] Usuário do recebimento bugado
-   [x] Data de descarga
-   [x] Gerar recibo de descarga
-   [x] Filtragem de erros criação de nova matrícula
-   [x] Reescrever mensagens de erro
-   [x] Refatorar testes
-   [x] Remodelar o recibo
-   [x] Alterar campos de data dos débitos
-   [x] Segunda parte do débito não imprime tabela de valores
-   [x] Símbolo de porcentagem não está sendo impresso no débito
-   [x] Redefinir permissões de usuário
-   [x] Implementar funções que utilizam regras de juros facultativa
-   [x] Trocar todas as listagens de matrícula para que sejam agrupadas por turma
    -   [x] Refazer estratégia de cache
-   [x] Search bars
-   [x] Rever views do handlebars
-   [x] Configurar dockerfile para montar containers
-   [ ] Arrumar controller, rota e DTO da criação de matrícula
-   [x] Refatorar testes
-   [x] Organizar senhas
-   [x] Rever celebrate
-   [x] Rever documentos
-   [x] Formatar débitos
