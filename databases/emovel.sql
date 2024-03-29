drop database if exists emovel;
create database emovel;
use emovel;

create table administradores (
	id int not null primary key auto_increment,
    nome varchar(120) not null,
    senha varchar(64) not null,
    email varchar(120) not null unique,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null
);

create table banners (
	id int not null primary key auto_increment,
    caminho varchar(256) not null,
    descricao text null,
    link varchar(255) null,
    nome varchar(255) not null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null
);


create table clientes (
	id int not null primary key auto_increment,
    nome varchar(120) not null,
    senha varchar(64) not null,
    email varchar(120) not null unique,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null
);

create table enderecos (
	id int not null primary key auto_increment,
    clientes_id int not null,
    bairro varchar(45) not null,
    logradouro varchar(255) not null,
    numero varchar(6),
    cidade varchar(120) not null,
    cep varchar(8) not null,
    complemento varchar(255),
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null,
	foreign key (clientes_id) references clientes(id) on delete restrict on update cascade
);


create table categorias(
	id int not null primary key auto_increment,
    nome varchar(45) not null,
    caminho varchar(256) not null,
    descricao text not null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null
);

create table areas(
	id int not null primary key auto_increment,
    nome varchar(45) not null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null
);

create table produtos (
	id int not null primary key auto_increment,
    categorias_id int not null,
    areas_id int not null,
    nome varchar(45) not null,
    largura decimal(10,0) not null,
    profundidade decimal(10,0) not null,
    altura decimal(10,0) not null,
    preco decimal(6,2) not null,
    descricao text not null,
    peso decimal(10,0) not null,	
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null,
    foreign key (categorias_id) references categorias(id) on delete restrict on update cascade,
    foreign key (areas_id) references areas(id) on delete restrict on update cascade
);


create table imagens (
	id int not null primary key auto_increment,
    caminho varchar(255) not null,
    produtos_id int not null,
    createdAt timestamp not null,
    updatedAt timestamp null,
    deletedAt timestamp null,
    foreign key (produtos_id) references produtos(id) on delete cascade on update cascade
);


create table formas_de_pagamento(
	id int not null primary key auto_increment,
    nome varchar(45) not null
);

create table pedidos(
	id int not null primary key auto_increment,
    enderecos_id int not null,
    clientes_id int not null,
    preco decimal(6,2) not null,
    formas_de_pagamento_id int not null,
    status varchar(20) not null default 'realizado',
    pagoAt timestamp null,
    createdAt timestamp null,
    deletedAt timestamp null,
    entregueAt timestamp null,
    updatedAt timestamp null,
    foreign key (enderecos_id) references enderecos(id) on delete restrict on update cascade,
    foreign key (clientes_id) references clientes(id) on delete restrict on update cascade,
    foreign key (formas_de_pagamento_id) references formas_de_pagamento(id) on delete restrict on update cascade
);

create table pedidos_has_produtos(
	pedidos_id int not null,
    produtos_id int not null,
    quantidade int not null,
    foreign key (pedidos_id) references pedidos(id) on delete restrict on update cascade,
    foreign key (produtos_id) references produtos(id) on delete restrict on update cascade,
    primary key (pedidos_id, produtos_id)
);


create table visitas(
	id int not null primary key auto_increment,
    produtos_id int not null,
	createdAt timestamp not null,
    foreign key (produtos_id) references produtos(id) on delete restrict on update cascade
);

create table estados(
	id int not null primary key auto_increment,
	 nome varchar(45) not null
);

create table cidades(
	id int not null primary key auto_increment,
	 nome varchar(45) not null,
      estados_id int not null,
	foreign key (estados_id) references estados(id) on delete restrict on update cascade
);

create table fretes(
	id int not null primary key auto_increment,
	estados_id int not null,
     preco decimal(6,2) not null,
	foreign key (estados_id) references estados(id) on delete restrict on update cascade
);



-- Inserção de dados 

INSERT INTO administradores (id, nome, email, senha, createdAt) VALUES
    (1, "André", "admin@emovel.com.br", "$2b$10$aLgye6UWdHYWVpbzXL1DhePNPr7YYIKsanzQoKwMrRj3mmt7kDO16", now());

INSERT INTO clientes (id, nome, email, senha, createdAt) VALUES (1, "Polentina", "polentina@gmail.com", "$2b$10$aLgye6UWdHYWVpbzXL1DhePNPr7YYIKsanzQoKwMrRj3mmt7kDO16", now());

INSERT INTO areas (id, nome, createdAt) VALUES 
	(1, "interna", now()),
	(2, "externa", now());

INSERT INTO categorias (id, nome, caminho, descricao, createdAt) VALUES 
(1, "Móveis", "/img/mesa-icone.svg", "Os melhores móveis do Brasil no conforto de um click. Deixe sua casa mais aconchegante com a E-móvel. Sua casa merece!", now()),
(2, "Mesas de Jantar", "/img/mesa-icone.svg", "É um item fundamental para a casa. Pequenas, grandes, de vidro ou madeira, você encontra aqui!", now()),
(3, "Armários", "/img/mesa-icone.svg", "É um item fundamental para a casa. Pequenos, grandes, de vidro ou madeira, você encontra aqui!", now()),
(4, "Mesas de Centro", "/img/mesa-icone.svg", "O clássico das salas de estar. Pequenas, grandes, de vidro ou madeira, você encontra aqui!", now()),
(5, "Sofás", "/img/mesa-icone.svg", "É um item fundamental para sua sala. Pequenos, grandes, de couro ou linho, você encontra aqui!", now()),
(6, "Cômodas", "/img/mesa-icone.svg", "Ideal para quartos infantis. Pequenas, grandes, de madeira maciça ou mdf, você encontra aqui!", now()),
(7, "Mesas Laterais", "/img/mesa-icone.svg", "Um item que traz conforto e praticidade para a sua casa. Unitárias ou conjunto, você encontra aqui!", now());


INSERT INTO produtos (id, categorias_id, areas_id, nome, preco, descricao, largura, profundidade, altura, createdAt, peso) VALUES 
(1, 3, 1, "Armário Armando", 1000.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 90, 60, 180, now(), 10.0),
(2, 5, 1, "Sofá Descanso Pleno", 2000.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 100, 100, now(), 10.0),
(3, 2, 1, "Mesa de Jantar Mônaco", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 80, 80, now(), 10.0),
(4, 2, 2, "Mesa de Jantar Aspen", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 80, 80, now(), 10.0),
(5, 2, 2, "Mesa de Jantar Bio", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 80, 80, now(), 10.0),
(6, 2, 1, "Mesa de Jantar Dora", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100 , 80 , 80, now(), 10.0),
(7, 4, 1, "Mesa de Centro Nature", 200.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 60, 60, 60, now(), 10.0),
(8, 6, 1, "Cômoda Jungle", 500.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 150, 80, 100, now(), 10.0),
(9, 7, 1, "Mesa Lateral Aurora", 80.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 30, 30, 60, now(), 10.0);


INSERT INTO imagens (id, caminho, produtos_id, createdAt) VALUES 
	(1, "/img/sofa-pleno-preto.png", 2, now()),
	(2, "/img/sofa-pleno-cinza.png", 2, now()),
	(3, "/img/sofa-pleno-branco.jpg", 2, now()),
	(4, "/img/mesa-monaco.png", 3, now()),
	(5, "/img/mesa.jpg", 3, now()),
	(6, "/img/mesa-aspen.png", 4, now()),
	(7, "/img/mesa.png", 4, now()),
	(8, "/img/mesa-bio.png", 5, now()),
	(9, "/img/mesa.jpg", 5, now()),
	(10, "/img/mesa.png", 5, now()),
	(11, "/img/mesa-dora.png", 6, now()),
	(12, "/img/mesa.jpg", 6, now()),
	(13, "/img/mesa-nature-bege.jpg", 7, now()),
	(14, "/img/mesa-nature-branca.jpg", 7, now()),
	(15, "/img/mesa-nature-amarela.jpg", 7, now()),
	(16, "/img/comoda-jungle-bege.avif", 8, now()),
	(17, "/img/comoda-jungle-preta.avif", 8, now()),
	(18, "/img/mesa-aurora-branca.jpg", 9, now()),
	(19, "/img/mesa-aurora-preta.jpg", 9, now()),
	(20, "/img/armario-armando-branco.jpg", 1, now()),
	(21, "/img/armario-armando-bege.webp", 1, now()),
	(22, "/img/armario-armando-preto.webp", 1, now());

INSERT INTO estados (id, nome) VALUES 
	(1, 'AP'),
    (2, 'AC'),
    (3, 'AL'),
    (4, 'AM'),
    (5, 'BA'),
    (6, 'CE'),
    (7, 'ES'),
    (8, 'GO'),
    (9, 'MA'),
    (10, 'MT'),
    (11, 'MS'),
    (12, 'MG'),
    (13, 'PA'),
    (14, 'PB'),
    (15, 'PR'),
    (16, 'TO'),
    (17, 'PE'),
    (18, 'PI'),
    (19, 'RJ'),
	(20, 'RN'),
    (21, 'RS'),
    (22, 'RO'),
    (23, 'RR'),
    (24, 'SC'),
    (25, 'SP'),
    (26, 'SE'),
    (27, 'DF');
    
INSERT INTO cidades (id, nome, estados_id) VALUES (1, "Jacuí", 1);
    
INSERT INTO fretes (id, estados_id, preco) VALUES (1, 1, 30.00);

INSERT INTO formas_de_pagamento (id, nome) VALUES 
	(1, "cartão de crédito"),
	(2, "pix"),
	(3, "boleto"),
	(4, "cartão de débito");
    
    
INSERT INTO enderecos (id, clientes_id, bairro, logradouro, numero, cep, createdAt, cidade) VALUES
    (1, 1, "parecida", "Rua Juju Ferreira", 100, "90100000", now(), 'São Paulo');
    
INSERT INTO pedidos (id, enderecos_id, clientes_id, formas_de_pagamento_id, preco, createdAt, entregueAt) VALUES (1, 1, 1, 2, 800.00, 1684084748000, now()),(2, 1, 1, 2, 1000.00, now(), null);

INSERT INTO pedidos_has_produtos (pedidos_id, produtos_id, quantidade) VALUES 
	(1, 5, 1),
    (2, 1, 2),
	(2, 3, 1);

INSERT INTO visitas (id, produtos_id, createdAt) VALUES 
	(1, 2, now()),
	(2, 5, now()),
	(3, 8, now());

insert into banners (id, caminho, descricao, nome, createdAt) values (1, '/img/banner1.jpeg', 'Cadeiras em promoção!', 'Cadeiras em promocao', now());


-- Consultas

select * from produtos;
select * from categorias;

select p.id, p.nome, c.nome as categoria from produtos as p
inner join categorias as c on p.categorias_id = c.id
group by p.id, p.nome, c.nome;

select 
	p.id,
    p.nome,
    c.nome as categoria, 
    a.nome as area from produtos as p
	inner join categorias as c on p.categorias_id = c.id
	inner join areas as a on p.areas_id = a.id
where 
	p.areas_id = 1 and p.categorias_id = 2;