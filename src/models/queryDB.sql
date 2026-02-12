-- DROP SCHEMA api;

CREATE SCHEMA api AUTHORIZATION postgres;

-- DROP SEQUENCE api.categoria_id_categoria_seq;

CREATE SEQUENCE api.categoria_id_categoria_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.color_id_color_seq;

CREATE SEQUENCE api.color_id_color_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.detalle_venta_id_detalle_venta_seq;

CREATE SEQUENCE api.detalle_venta_id_detalle_venta_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.genero_id_genero_seq;

CREATE SEQUENCE api.genero_id_genero_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.material_id_material_seq;

CREATE SEQUENCE api.material_id_material_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.producto_color_id_producto_color_seq;

CREATE SEQUENCE api.producto_color_id_producto_color_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.producto_id_producto_seq;

CREATE SEQUENCE api.producto_id_producto_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.producto_imagen_id_imagen_seq;

CREATE SEQUENCE api.producto_imagen_id_imagen_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.tamano_id_tamano_seq;

CREATE SEQUENCE api.tamano_id_tamano_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.tipo_pedido_id_tipo_pedido_seq;

CREATE SEQUENCE api.tipo_pedido_id_tipo_pedido_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;
-- DROP SEQUENCE api.venta_id_venta_seq;

CREATE SEQUENCE api.venta_id_venta_seq
	INCREMENT BY 1
	MINVALUE 1
	MAXVALUE 9223372036854775807
	START 1
	CACHE 1
	NO CYCLE;-- api.categoria definition

-- Drop table

-- DROP TABLE api.categoria;

CREATE TABLE api.categoria (
	id_categoria bigserial NOT NULL,
	nombre_categoria varchar(50) NOT NULL,
	url_categoria text NULL,
	estado_categoria bool NULL,
	descripcion_categoria text NULL,
	CONSTRAINT categoria_pkey PRIMARY KEY (id_categoria)
);


-- api.cliente definition

-- Drop table

-- DROP TABLE api.cliente;

CREATE TABLE api.cliente (
	dni_cliente varchar(20) NOT NULL,
	nombre_cliente varchar(50) NULL,
	apellido_cliente varchar(50) NULL,
	telefono_cliente text NULL,
	correo_cliente text NULL,
	departamento_cliente text NULL,
	ciudad_cliente text NULL,
	direccion_cliente text NULL,
	estado_cliente bool NULL,
	CONSTRAINT comprador_pkey PRIMARY KEY (dni_cliente)
);


-- api.color definition

-- Drop table

-- DROP TABLE api.color;

CREATE TABLE api.color (
	id_color bigserial NOT NULL,
	nombre_color varchar(30) NOT NULL,
	codigo_color text NULL,
	estado bool NULL,
	CONSTRAINT color_pkey PRIMARY KEY (id_color)
);


-- api.genero definition

-- Drop table

-- DROP TABLE api.genero;

CREATE TABLE api.genero (
	id_genero bigserial NOT NULL,
	nombre_genero varchar(20) NOT NULL,
	CONSTRAINT genero_pkey PRIMARY KEY (id_genero)
);


-- api.material definition

-- Drop table

-- DROP TABLE api.material;

CREATE TABLE api.material (
	id_material bigserial NOT NULL,
	nombre_material varchar(50) NOT NULL,
	CONSTRAINT material_pkey PRIMARY KEY (id_material)
);


-- api.tamano definition

-- Drop table

-- DROP TABLE api.tamano;

CREATE TABLE api.tamano (
	id_tamano bigserial NOT NULL,
	ancho int4 NULL,
	largo int4 NULL,
	CONSTRAINT tamano_pkey PRIMARY KEY (id_tamano)
);


-- api.tipo_pedido definition

-- Drop table

-- DROP TABLE api.tipo_pedido;

CREATE TABLE api.tipo_pedido (
	id_tipo_pedido bigserial NOT NULL,
	nombre_tipo varchar(30) NULL,
	CONSTRAINT tipo_pedido_pkey PRIMARY KEY (id_tipo_pedido)
);


-- api.producto definition

-- Drop table

-- DROP TABLE api.producto;

CREATE TABLE api.producto (
	id_producto bigserial NOT NULL,
	nombre_producto varchar(100) NOT NULL,
	descripcion_producto text NULL,
	precio_base numeric(10, 2) NULL,
	imagen_url text NULL,
	estado_producto varchar(20) DEFAULT 'disponible'::character varying NULL,
	id_categoria int8 NULL,
	id_genero int8 NULL,
	id_tamano int8 NULL,
	precio_oferta numeric NULL,
	en_oferta bool DEFAULT false NULL,
	destacado bool DEFAULT false NULL,
	CONSTRAINT producto_pkey PRIMARY KEY (id_producto),
	CONSTRAINT producto_id_categoria_fkey FOREIGN KEY (id_categoria) REFERENCES api.categoria(id_categoria),
	CONSTRAINT producto_id_genero_fkey FOREIGN KEY (id_genero) REFERENCES api.genero(id_genero),
	CONSTRAINT producto_id_tamano_fkey FOREIGN KEY (id_tamano) REFERENCES api.tamano(id_tamano)
);


-- api.producto_color definition

-- Drop table

-- DROP TABLE api.producto_color;

CREATE TABLE api.producto_color (
	id_producto int8 NOT NULL,
	id_color int8 NOT NULL,
	id_producto_color int8 GENERATED BY DEFAULT AS IDENTITY( INCREMENT BY 1 MINVALUE 1 MAXVALUE 9223372036854775807 START 1 CACHE 1 NO CYCLE) NOT NULL,
	CONSTRAINT producto_color_pkey PRIMARY KEY (id_producto_color),
	CONSTRAINT producto_color_id_color_fkey FOREIGN KEY (id_color) REFERENCES api.color(id_color),
	CONSTRAINT producto_color_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES api.producto(id_producto) ON DELETE CASCADE
);


-- api.producto_imagen definition

-- Drop table

-- DROP TABLE api.producto_imagen;

CREATE TABLE api.producto_imagen (
	id_imagen bigserial NOT NULL,
	id_producto int8 NULL,
	imagen_url text NULL,
	CONSTRAINT producto_imagen_pkey PRIMARY KEY (id_imagen),
	CONSTRAINT producto_imagen_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES api.producto(id_producto) ON DELETE CASCADE
);


-- api.producto_material definition

-- Drop table

-- DROP TABLE api.producto_material;

CREATE TABLE api.producto_material (
	id_producto int8 NOT NULL,
	id_material int8 NOT NULL,
	id_producto_material int8 NOT NULL,
	CONSTRAINT producto_material_pkey PRIMARY KEY (id_producto_material),
	CONSTRAINT producto_material_id_material_fkey FOREIGN KEY (id_material) REFERENCES api.material(id_material),
	CONSTRAINT producto_material_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES api.producto(id_producto) ON DELETE CASCADE
);


-- api.venta definition

-- Drop table

-- DROP TABLE api.venta;

CREATE TABLE api.venta (
	id_venta bigserial NOT NULL,
	id_comprador varchar(20) NULL,
	id_tipo_pedido int8 NULL,
	total_venta numeric(10, 2) NULL,
	fecha_venta timestamp DEFAULT now() NULL,
	CONSTRAINT venta_pkey PRIMARY KEY (id_venta),
	CONSTRAINT venta_id_comprador_fkey FOREIGN KEY (id_comprador) REFERENCES api.cliente(dni_cliente),
	CONSTRAINT venta_id_tipo_pedido_fkey FOREIGN KEY (id_tipo_pedido) REFERENCES api.tipo_pedido(id_tipo_pedido)
);


-- api.detalle_venta definition

-- Drop table

-- DROP TABLE api.detalle_venta;

CREATE TABLE api.detalle_venta (
	id_detalle_venta bigserial NOT NULL,
	id_venta int8 NULL,
	id_producto int8 NULL,
	cantidad int4 NOT NULL,
	precio_unitario numeric(10, 2) NULL,
	CONSTRAINT detalle_venta_pkey PRIMARY KEY (id_detalle_venta),
	CONSTRAINT detalle_venta_id_producto_fkey FOREIGN KEY (id_producto) REFERENCES api.producto(id_producto),
	CONSTRAINT detalle_venta_id_venta_fkey FOREIGN KEY (id_venta) REFERENCES api.venta(id_venta) ON DELETE CASCADE
);



-- DROP FUNCTION api.allow_public_read();

CREATE OR REPLACE FUNCTION api.allow_public_read()
 RETURNS boolean
 LANGUAGE sql
 STABLE
AS $function$
  select true;
$function$
;

-- ============================================
-- POLÍTICAS RLS PARA producto_color
-- ============================================

ALTER TABLE api.producto_color ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT para usuarios autenticados
CREATE POLICY "Enable insert for authenticated users on producto_color"
ON api.producto_color FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir SELECT para todos
CREATE POLICY "Enable read for all users on producto_color"
ON api.producto_color FOR SELECT
TO anon, authenticated
USING (true);

-- Permitir DELETE para usuarios autenticados
CREATE POLICY "Enable delete for authenticated users on producto_color"
ON api.producto_color FOR DELETE
TO authenticated
USING (true);

-- Permitir UPDATE para usuarios autenticados
CREATE POLICY "Enable update for authenticated users on producto_color"
ON api.producto_color FOR UPDATE
TO authenticated
USING (true);

-- ============================================
-- POLÍTICAS RLS PARA producto_imagen
-- ============================================

ALTER TABLE api.producto_imagen ENABLE ROW LEVEL SECURITY;

-- Permitir INSERT para usuarios autenticados
CREATE POLICY "Enable insert for authenticated users on producto_imagen"
ON api.producto_imagen FOR INSERT
TO authenticated
WITH CHECK (true);

-- Permitir SELECT para todos
CREATE POLICY "Enable read for all users on producto_imagen"
ON api.producto_imagen FOR SELECT
TO anon, authenticated
USING (true);

-- Permitir DELETE para usuarios autenticados
CREATE POLICY "Enable delete for authenticated users on producto_imagen"
ON api.producto_imagen FOR DELETE
TO authenticated
USING (true);

-- Permitir UPDATE para usuarios autenticados
CREATE POLICY "Enable update for authenticated users on producto_imagen"
ON api.producto_imagen FOR UPDATE
TO authenticated
USING (true);