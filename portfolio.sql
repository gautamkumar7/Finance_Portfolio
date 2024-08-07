create database portfolio;

use portfolio;

drop table transactions;



CREATE TABLE transactions (
    transaction_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    transaction_type VARCHAR(10),
    transaction_date DATE,
    quantity INT,
    price_per_quantity DECIMAL(18,6),
    total_value DECIMAL(18,6),
    investment_type VARCHAR(50)
);

delete from transactions;

INSERT INTO transactions (transaction_type, quantity, price_per_quantity, investment_type)
VALUES ('BUY', 10, 100.64, 'STOCK');
select * from transactions;