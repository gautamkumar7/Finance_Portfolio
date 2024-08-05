CREATE DATABASE portfolio;

USE portfolio;

CREATE TABLE Stocks (
    StockID int NOT NULL PRIMARY KEY,
	TickerSymbol varchar(10),
    CompanyName varchar(100),
    Industry varchar(50),
	CurrentPrice decimal(18,6)
);

CREATE TABLE Transactions (
    TransID int NOT NULL PRIMARY KEY,
    StockID int,
	TransType varchar(10),
    TransDate date,
    Quantity int,
	PricePerShare decimal(18,6),
	TotalValue decimal(18,6),
    FOREIGN KEY (StockID) REFERENCES Stocks(StockID)
);


CREATE TABLE MarketData (
    MarketDataID int NOT NULL PRIMARY KEY,
    StockID int,
	MarketDate date,
    OpeningPrice decimal(18,6),
	ClosingPrice decimal(18,6),
    HighPrice decimal(18,6),
    LowPrice decimal(18,6),
    Volume int,
    FOREIGN KEY (StockID) REFERENCES Stocks(StockID)
);

