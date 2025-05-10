create database VISalud

 use VISalud

create table productos (
id_producto int auto_increment primary key not null ,
nombre_producto varchar(40) not null,
id_presentacion int not null,
id_laboratorio int not null,
vencimiento date not null,
precio_unitario float not null,
stock int not null,
imagen longtext
);

create table Laboratorio (
id_laboratorio int auto_increment primary key,
nombre_laboratorio varchar(30)
);
create table Presentacion (
id_presentacion int auto_increment primary key,
nombre_presentacion varchar(20)
);

create table Compra (
numero_compra int auto_increment key,
fecha_compra date,
total_compra float
);

create table detalle_Compra (
id_detallecompra int auto_increment primary key,
numero_compra int,
id_producto  int ,
cantidad  int,
precio_unitario float 
);

create table Venta (
numero_factura int auto_increment primary key,
id_usuario int,
fecha_venta date,
total_venta float
);

create table Detalle_Venta (
id_detalleventa int auto_increment primary key,
numero_factura int,
id_producto int,
cantidad int,
precio_unitario float 
);


create table Usauarios (
id_usuario int not null,
usuario varchar(35) not null,
contraseña varchar(30) not null
);
RENAME TABLE venta TO ventas;

-- Relación Productos -> Categorias
ALTER TABLE productos
ADD CONSTRAINT fk_presentacion_producto FOREIGN KEY (id_presentacion) REFERENCES presentacion (id_presentacion);

-- Relación Compras -> Empleados
ALTER TABLE productos
ADD CONSTRAINT fk_laboratorio_productos FOREIGN KEY (id_laboratorio) REFERENCES laboratorio (id_laboratorio);

-- Relación Ventas -> Clientes
ALTER TABLE detalle_venta
ADD CONSTRAINT fk_producto_detalle_venta FOREIGN KEY (id_producto) REFERENCES productos (id_producto);

-- Relación Ventas -> Empleados
ALTER TABLE detalle_venta
ADD CONSTRAINT fk_venta_detalleventa FOREIGN KEY (numero_factura) REFERENCES ventas (numero_factura);

ALTER TABLE detalle_compra
ADD CONSTRAINT fk_compra_detallecompra FOREIGN KEY (id_producto) REFERENCES productos (id_producto);

ALTER TABLE detalle_compra
ADD CONSTRAINT fk_venta_detallecomopra FOREIGN KEY (numero_compra) REFERENCES compra (numero_compra);
-- Configuración de fecha_venta por defecto
ALTER TABLE ventas
MODIFY COLUMN fecha_venta DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Relación Detalles_Compras -> Compras y Productos
ALTER TABLE detalle_compra
ADD CONSTRAINT fk_compra_detalle FOREIGN KEY (numero_compra) REFERENCES compras (numero_compra),
ADD CONSTRAINT fk_producto_compra FOREIGN KEY (id_producto) REFERENCES Productos (id_producto);

-- Relación Detalles_Ventas -> Ventas y Productos
ALTER TABLE detalle_venta
ADD CONSTRAINT fk_venta_detalle FOREIGN KEY (numero_factura) REFERENCES ventas (numero_factura),
ADD CONSTRAINT fk_producto_venta FOREIGN KEY (id_producto) REFERENCES productos (id_producto);

INSERT INTO Presentacion (nombre_presentacion) VALUES 
('Caja'),
('Blister'),
('Frasco'),
('Bolsa'),
('Ampolla'),
('Tableta'),
('Crema'),
('Jarabe'),
('Gotas'),
('Inyectable');

INSERT INTO Laboratorio (nombre_laboratorio) VALUES 
('Pfizer'),
('Roche'),
('Bayer'),
('Novartis'),
('Sanofi'),
('AbbVie'),
('Johnson & Johnson'),
('Merck'),
('GSK'),
('AstraZeneca');

INSERT INTO Productos (
  nombre_producto, id_presentacion, id_laboratorio, vencimiento, precio_unitario, stock, imagen
) VALUES
('Paracetamol', 1, 1, '2026-01-01', 1.50, 100, NULL),
('Ibuprofeno', 2, 2, '2025-12-01', 2.20, 200, NULL),
('Amoxicilina', 3, 3, '2026-05-10', 3.00, 150, NULL),
('Loratadina', 4, 4, '2027-07-20', 2.75, 120, NULL),
('Omeprazol', 5, 5, '2025-09-30', 1.80, 180, NULL),
('Vitamina C', 6, 6, '2027-03-15', 0.90, 300, NULL),
('Diclofenaco', 7, 7, '2026-11-11', 2.10, 90, NULL),
('Metformina', 8, 8, '2026-08-08', 1.70, 110, NULL),
('Salbutamol', 9, 9, '2026-06-06', 2.90, 75, NULL),
('Azitromicina', 10, 10, '2025-10-10', 3.50, 130, NULL);