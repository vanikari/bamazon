DROP DATABASE IF EXISTS bamazon;

CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(45),
  department_name VARCHAR(45),
  price DECIMAL (13,2),
  stock_quantity INTEGER,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES  ("notebook", "stationery", 2.50, 50),
				("sun screen", "personal care", 15.00, 30),     
                ("skillet", "cookware", 45.95, 8),
                ("pen", "stationery", 5.00, 20),     
                ("trash bags", "household", 10.50, 15),                 
                ("poop bags", "pets", 5.00, 35),
				("head phone", "electronics", 250.00, 10),
				("refrigerator", "home appliance", 2000.00, 25),
                ("diapers", "baby", 55.00, 65),
                ("rug", "home decor", 55.00, 10);

select * from products;
