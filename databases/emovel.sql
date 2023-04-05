drop database if exists emovel;
create database emovel;
use emovel;

create table administradores (
	id int not null primary key auto_increment,
    nome varchar(120) not null,
    senha varchar(64) not null,
    email varchar(120) not null unique
);

create table banners (
	id int not null primary key auto_increment,
    imagem varchar(256) not null,
    descricao text not null,
    link varchar(255) null
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

create table estados (
	id int not null primary key auto_increment,
    nome varchar(60) not null
);

create table cidades (
	id int not null primary key auto_increment,
    nome varchar(60) not null,
    estados_id int not null,
    foreign key (estados_id) references estados(id) on delete restrict on update cascade
);

create table fretes (
	id int not null primary key auto_increment,
    estados_id int not null,
    preco decimal(6,2) not null,
    foreign key (estados_id) references estados(id) on delete restrict on update cascade
);

create table enderecos (
	id int not null primary key auto_increment,
    clientes_id int not null,
    bairro varchar(45) not null,
    logradouro varchar(250) not null,
    numero varchar(6),
    cidades_id int not null,
    cep varchar(8) not null,
	foreign key (clientes_id) references clientes(id) on delete restrict on update cascade,
    foreign key (cidades_id) references cidades(id) on delete restrict on update cascade
);


create table categorias(
	id int not null primary key auto_increment,
    nome varchar(45) not null,
    slug varchar(100) not null unique,
    icone varchar(256) not null,
    descricao text not null
);

create table areas(
	id int not null primary key auto_increment,
    nome varchar(45) not null,
    slug varchar(100) not null unique
);

create table produtos (
	id int not null primary key auto_increment,
    slug varchar(100) not null unique,
    categorias_id int not null,
    areas_id int not null,
    nome varchar(45) not null,
    largura int not null,
    profundidade int not null,
    altura int not null,
    preco decimal(6,2) not null,
    descricao text not null,
    foreign key (categorias_id) references categorias(id) on delete restrict on update cascade,
    foreign key (areas_id) references areas(id) on delete restrict on update cascade
);


create table imagens (
	id int not null primary key auto_increment,
    caminho varchar(100) not null,
    produtos_id int not null,
    foreign key (produtos_id) references produtos(id) on delete cascade on update cascade
);


create table formas_de_pagamento(
	id int not null primary key auto_increment,
    nome varchar(45) not null
);

create table pedidos(
	id int not null primary key auto_increment,
    createdAt timestamp not null,
    enderecos_id int not null,
    clientes_id int not null,
    preco decimal(6,2) not null,
    formas_de_pagamento_id int not null,
    pagoAt timestamp null,
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

-- Inserção de dados 

INSERT INTO administradores (id, nome, email, senha) VALUES
    (1, "André", "admin@emovel.com.br", "$2b$10$aLgye6UWdHYWVpbzXL1DhePNPr7YYIKsanzQoKwMrRj3mmt7kDO16");

INSERT INTO clientes (id, nome, email, senha) VALUES (1, "Polentina", "polentina@gmail.com", "$2b$10$aLgye6UWdHYWVpbzXL1DhePNPr7YYIKsanzQoKwMrRj3mmt7kDO16");

INSERT INTO areas (id, nome, slug) VALUES 
	(1, "interna", "areainterna"),
	(2, "externa", "areaexterna");

INSERT INTO categorias (id, slug, nome, icone, descricao) VALUES 
(1, "moveis", "Móveis", "/img/moveis-icone.svg", "Os melhores móveis do Brasil no conforto de um click. Deixe sua casa mais aconchegante com a E-móvel. Sua casa merece!"),
(2, "mesasdejantar", "Mesas de Jantar", "img/mesasdejantar-icone.svg", "É um item fundamental para a casa. Pequenas, grandes, de vidro ou madeira, você encontra aqui!"),
(3, "cadeiras", "Cadeiras", "/img/cadeiras-icone.svg", "É um item fundamental para a casa. Estofadas, de acrílico ou madeira, você encontra aqui!"),
(4, "mesasdecentro", "Mesas de Centro", "/img/mesasdecentro-icone.svg", "O clássico das salas de estar. Pequenas, grandes, de vidro ou madeira, você encontra aqui!"),
(5, "sofas", "Sofás", "/img/sofas-icone.svg", "É um item fundamental para sua sala. Pequenos, grandes, de couro ou linho, você encontra aqui!"),
(6, "comodas", "Cômodas", "/img/comodas-icone.svg", "Ideal para quartos infantis. Pequenas, grandes, de madeira maciça ou mdf, você encontra aqui!"),
(7, "mesaslaterais", "Mesas Laterais", "/img/mesaslaterais-icone.svg", "Um item que traz conforto e praticidade para a sua casa. Unitárias ou conjunto, você encontra aqui!"),
(8, "balancos", "Balanços", "/img/balancos-icone.svg", "Item destaque para seu jardim. Pequenos, grandes, você encontra aqui!"),
(9, "armarios", "Armários", "/img/armarios-icone.svg", "É um item fundamental para a casa. Pequenos, grandes, de vidro ou madeira, você encontra aqui!");

INSERT INTO produtos (id, categorias_id, areas_id, nome, slug, preco, descricao, largura, profundidade, altura) VALUES 
(1, 3, 1, "Cadeira Saarinen", "cadeirasaarinen", 100.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 80, 80, 80),
(2, 5, 1, "Sofá Descanso Pleno", "sofadescansopleno", 2000.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 100, 100),
(3, 2, 1, "Mesa de Jantar Mônaco", "mesadejantarmonaco", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 80, 80),
(4, 2, 2, "Mesa de Jantar Aspen", "mesadejantaraspen", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 80, 80),
(5, 2, 2, "Mesa de Jantar Bio", "mesadejantarbio", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100, 80, 80),
(6, 2, 1, "Mesa de Jantar Dora", "mesadejantardora", 800.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 100 , 80 , 80),
(7, 4, 1, "Mesa de Centro Nature", "mesadecentronature", 200.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 60, 60, 60),
(8, 6, 1, "Cômoda Jungle", "comodajungle", 500.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 150, 80, 100),
(9, 7, 1, "Mesa Lateral Aurora", "mesalateralaurora", 80.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 30, 30, 60),
(10, 8, 2, "Balanço de Jardim Lover", "balancodejardimlover", 1500.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 150, 90, 150),
(11, 9, 1, "Armário Armando", "armarioarmando", 1000.00, "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam aperiam minima necessitatibus, quis blanditiis exercitationem veniam earum error quam cupiditate iste vitae accusamus voluptatem corporis ullam? Eos sit nisi vero.", 90, 60, 180);

INSERT INTO imagens (id, caminho, produtos_id) VALUES 
	(1, "/img/cadeira-saarinen-preta.png", 1),
	(2, "/img/cadeira-saarinen-branca.jfif", 1),
	(3, "/img/cadeira-saarinen-Bege.jfif", 1),
	(4, "/img/sofa-pleno-preto.png", 2),
	(5, "/img/sofa-pleno-cinza.png", 2),
	(6, "/img/sofa-pleno-branco.jpg", 2),
	(7, "/img/mesa-monaco.png", 3),
	(8, "/img/mesa.jpg", 3),
	(9, "/img/mesa-aspen.png", 4),
	(10, "/img/mesa.png", 4),
	(11, "/img/mesa-bio.png", 5),
	(12, "/img/mesa.jpg", 5),
	(13, "/img/mesa.png", 5),
	(14, "/img/mesa-dora.png", 6),
	(15, "/img/mesa.jpg", 6),
	(16, "/img/mesa-nature-bege.jpg", 7),
	(17, "/img/mesa-nature-branca.jpg", 7),
	(18, "/img/mesa-nature-amarela.jpg", 7),
	(19, "/img/comoda-jungle-bege.avif", 8),
	(20, "/img/comoda-jungle-preta.avif", 8),
	(21, "/img/mesa-aurora-branca.jpg", 9),
	(22, "/img/mesa-aurora-preta.jpg", 9),
	(23, "/img/balanco-lover-bege.webp", 10),
	(24, "/img/balanco-lover-amarelo.webp", 10),
	(25, "/img/armario-armando-branco.jpg", 11),
	(26, "/img/armario-armando-bege.webp", 11),
	(27, "/img/armario-armando-preto.webp", 11);

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
    
    
INSERT INTO enderecos (id, clientes_id, bairro, logradouro, numero, cidades_id, cep) VALUES
    (1, 1, "parecida", "Rua Juju Ferreira", 100, 1, "90100000");
    
INSERT INTO pedidos (id, enderecos_id, clientes_id, formas_de_pagamento_id, preco, createdAt) VALUES (1, 1, 1, 2, 1000.00, now());

INSERT INTO pedidos_has_produtos (pedidos_id, produtos_id, quantidade) VALUES 
	(1, 1, 2),
	(1, 3, 1);

INSERT INTO visitas (id, produtos_id, createdAt) VALUES 
	(1, 2, now()),
	(2, 5, now()),
	(3, 8, now());

insert into banners (id, imagem, descricao) values (1, '/img/banner1.jpeg', 'Cadeiras em promoção!');


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


