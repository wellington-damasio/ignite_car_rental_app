# Cadastro de carro

### Requisito Funcional
- Deve ser posível cadastrar um carro
- Deve ser possível listar todas as categorias

### Regras de Negócio
- Não deve ser possível cadastar um carro com uma placa já existente
- Não deve ser possível alterar a placa de um carro já cadastrado
- O carro deve ser cadastrado com disponibilidade por padrão
- Somente o usuário administrador deve ter permissão para cadastrar carros

# Listagem de carros

### Requisito Funcional
- Deve ser possível listar todos os carros disponível (available = true)
- Deve ser possível listar todos os carros disponiveis pelo nome da categoria
- Deve ser possível listar todos os carros disponiveis pelo nome da marca
- Deve ser possível listar todos os carros disponiveis pelo nome do modelo do carro

### Regras de Negócio
- Não deve ser necessário estar logado no sistema para listar carros

# Cadastro de especificicações de carros

### Requisito Funcional
- Deve ser possível cadastrar uma especificação para um carro

### Regra de Negócio
[x] Não deve ser possível cadastrar uma espeficicação de um carro não cadastrado
[] Não deve ser possível cadastrar uma especificação já existente para um carro
[] O usuário responsável paelo cadastro de especificações deve ser um administrador

# Cadastro de imagens do carro

### Requisito Funcional
- Deve ser possível cadastrar a imagem do carro

### Requisito não-funcional
- Utilizar a biblioteca *multer* para o upload dos arquivos de imagem

### Regras de Negócio
- O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- O usuário responsável pelo cadastro das imagem dos carros deve ser um administrador

# Aluguel de carros

### Requisito Funcional
- Deve se possível cadastrar um aluguel

### Regras de Negócio
- O aluguel deve ter duração mínima de 24 horas
- Um usuário não deve ter permissão para aluguel múltiplos carros simultaneamente
- O usuário não deve conseguir fazer o aluguel de um carro no periodo em que este já está alugado por outro usuário

<!-- // "./src/modules/**/entities/*.ts" -->