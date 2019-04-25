
SET search_path = '$user', public;

CREATE TABLE users(
    id INT GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255) ,
    email varchar(255),
    password VARCHAR(255),
    created TIMESTAMP
);

-- pk
ALTER TABLE users ADD CONSTRAINT pk_users_id PRIMARY KEY (id);
-- unique
ALTER TABLE users ADD CONSTRAINT unique_users_username UNIQUE (username);
ALTER TABLE users ADD CONSTRAINT unique_users_email UNIQUE (email);
ALTER TABLE users ADD CONSTRAINT unique_users_username_email_password UNIQUE (username, email, password);
-- not null condition
ALTER TABLE users ALTER COLUMN email SET NOT NULL;
ALTER TABLE users ALTER COLUMN username SET NOT NULL;
ALTER TABLE users ALTER COLUMN password SET NOT NULL;
ALTER TABLE users ALTER COLUMN created SET NOT NULL;
-- default
ALTER TABLE users ALTER COLUMN created SET DEFAULT NOW();

-- PRODUCTS
CREATE TABLE products(
    id INT GENERATED ALWAYS AS IDENTITY,
    name varchar(255),
    price numeric( 18 , 2 ),
    image varchar(1024),
    category varchar(255),
    description text,
    creator INT,
    created TIMESTAMP
);

-- primary key constraint
ALTER TABLE products ADD CONSTRAINT pk_products_id PRIMARY KEY( id );
--fk
ALTER TABLE products ADD CONSTRAINT fk_products_users FOREIGN KEY ( creator ) REFERENCES users( id );
-- NOT NULL constraint
ALTER TABLE products ALTER COLUMN name SET NOT NULL;
ALTER TABLE products ALTER COLUMN image SET NOT NULL;
ALTER TABLE products ALTER COLUMN price SET NOT NULL;
ALTER TABLE products ALTER COLUMN description SET NOT NULL;
ALTER TABLE products ALTER COLUMN category SET NOT NULL;
ALTER TABLE products ALTER COLUMN creator SET NOT NULL;
ALTER TABLE products ALTER COLUMN created SET NOT NULL;
-- unique constraint
ALTER TABLE products ADD CONSTRAINT unique_products_name UNIQUE (name);
ALTER TABLE products ADD CONSTRAINT unique_products_image UNIQUE (image);
ALTER TABLE products ADD CONSTRAINT unique_products_description UNIQUE (description);
ALTER TABLE products ADD CONSTRAINT unique_products_all UNIQUE (name , image , price , description , category ); 

-- check constraint
ALTER TABLE products ADD CONSTRAINT price CHECK (price > 0 );
ALTER TABLE products ADD CONSTRAINT check_products_category CHECK ( category IN ('Fashion', 'Electronics' , 'Books' , 'Home & Garden' , 'Accessories' , 'Furniture' ));
--default
ALTER TABLE products ALTER COLUMN created SET DEFAULT NOW();

-- carts
CREATE TABLE carts (
    id INT GENERATED ALWAYS AS IDENTITY,
    userId INT,
    created TIMESTAMP
);


-- pk
ALTER TABLE carts ADD CONSTRAINT pk_carts_id PRIMARY KEY( id );
-- fk
ALTER TABLE carts ADD CONSTRAINT fk_carts_users FOREIGN KEY ( userId ) REFERENCES users( id );
--unique 
ALTER TABLE carts ADD CONSTRAINT unique_carts_userId UNIQUE( userId );
-- default
ALTER TABLE carts ALTER COLUMN created SET DEFAULT NOW();
--index
--CREATE INDEX carts_userId ON carts USING btree(userId);



-- carts_products
CREATE TABLE carts_products (
    id INT GENERATED ALWAYS AS IDENTITY,
    cartId INT,
    productId INT,
    quantity INT
);

-- pk
ALTER TABLE carts_products ADD CONSTRAINT pk_carts_products_id PRIMARY KEY ( id );
-- fk
ALTER TABLE carts_products ADD CONSTRAINT fk_carts_carts_products FOREIGN KEY (cartId ) REFERENCES carts( id ); 
ALTER TABLE carts_products ADD CONSTRAINT fk_products_carts_products FOREIGN KEY (productId ) REFERENCES products(id);
--default
ALTER TABLE carts_products ALTER COLUMN quantity SET DEFAULT 1;
--check
ALTER TABLE carts_products ADD CONSTRAINT check_quanity_positive CHECK (quantity >= 0);

-- View
CREATE VIEW users_products AS 
SELECT u.username , u.email, c.id, p.name, cp.quantity
FROM users u
JOIN carts c
ON u.id = c.userId
JOIN carts_products cp
ON c.id = cp.cartId
JOIN products p
ON cp.productId = p.id;

CREATE VIEW products_view AS
SELECT p.id product_id, p.name product_name, p.price price, p.image product_image ,p.category category, p.description description, u.id user_id, u.email email, u.username username FROM products p JOIN users u ON p.creator = u.id;