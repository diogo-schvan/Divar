CREATE TABLE cidades (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE grupos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE usuarios (
	id SERIAL PRIMARY KEY,
	nome_completo VARCHAR(50) NOT NULL,
	cpf VARCHAR(14) NOT NULL,
	data_nascimento DATE NOT NULL,
	endereco VARCHAR(100) NOT NULL,
	telefone VARCHAR(15) NOT NULL,
	senha VARCHAR(100) NOT NULL,
	tipo_usuario VARCHAR(20) NOT NULL,
	id_grupo INT,
	id_cidade INT,
	limite_produtos INT,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_grupo) REFERENCES grupos(id),
	FOREIGN KEY (id_cidade) REFERENCES cidades(id)
);

CREATE TABLE pedidos (
	id SERIAL PRIMARY KEY,
	is_aprovado CHAR NOT NULL,
	id_usuario INT,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_usuario) REFERENCES usuarios(id)
);

CREATE TABLE tipo_produtos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE produtos (
	id SERIAL PRIMARY KEY,
	nome VARCHAR(50) NOT NULL,
	descricao VARCHAR(100) NOT NULL,
	codigo_de_barras VARCHAR(50) NOT NULL,
	valor FLOAT NOT NULL,
	is_ativo CHAR NOT NULL,
	diretorio_foto VARCHAR(100),
	id_tipo_produto INT,
	quantidade_em_estoque INT NOT NULL,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_tipo_produto) REFERENCES tipo_produtos(id)
);

CREATE TABLE pedido_produtos (
	id_pedido INT,
	id_produto INT,
	quantidade_produto INT,
	valor_produto FLOAT,
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_pedido) REFERENCES pedidos(id),
	FOREIGN KEY (id_produto) REFERENCES produtos(id)
);

CREATE TABLE cidade_grupos (
	id_cidade INT,
	id_grupo INT,
	PRIMARY KEY (id_cidade, id_grupo),
	created_at TIMESTAMP DEFAULT NOW(),
	updated_at TIMESTAMP DEFAULT NOW(),
	FOREIGN KEY (id_cidade) REFERENCES cidades(id),
	FOREIGN KEY (id_grupo) REFERENCES grupos(id)
);
