CREATE TABLE papel (
  id int,
  descricao VARCHAR(15),
  CONSTRAINT id_papel_pk PRIMARY KEY(id)
);

CREATE TABLE users (
  id INT AUTO_INCREMENT,
  name VARCHAR(30),
  email VARCHAR(50),
  senha VARCHAR(30),  
  ativo BOOLEAN , 
  papel_id INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  CONSTRAINT id_users_pk PRIMARY KEY (id),
  CONSTRAINT id_papel_fk FOREIGN KEY (papel_id) REFERENCES papel(id)
);


INSERT INTO papel(id,descricao)  VALUES (0, 'Usuario');
INSERT INTO papel(id, descricao) VALUES (1, 'Administrador');

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Matheus Magalhaes", "matheusschorro@gmail.com", "Admin", true, 1);

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Renata Capoia", "renata.capoia@gmail.com", "123Mudar@", true, 0);


INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Matheus Albukerk", "albukerk@gmail.com", "123Mudar@", true, 0);

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Robson Akagui", "Robson@gmail.com", "123Mudar@", true, 0);

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Alisson Cogo", "Alisson@gmail.com", "123Mudar@", true, 0);

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Joao Polloni", "polloni@gmail.com", "123Mudar@", true, 0);

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Ana Lima", "ana.lima@gmail.com", "123Mudar@", true, 0);

INSERT INTO users(name, email, senha, ativo, papel_id) 
VALUES ("Lucas Martins", "lucas.martins@gmail.com", "123Mudar@", true, 0);


