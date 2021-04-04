USE backend_task

CREATE table Categories (
	ID INT not null primary key,
	CategoryName varchar(45),
	ParentID INT,
	foreign key(ParentID) references Categories(ID)
);

CREATE table Products (
	ID INT not null primary key,
	ProductName varchar(45),
	ImageURI varchar(255),
	CategoryID INT,
	foreign key(CategoryID) references Categories(ID)
);


CREATE table Providers (
	ID INT not null primary key,
	ProviderName varchar(45)
);

CREATE table ProductProviders (
	ProductsID INT not null,
	ProvidersID INT not null,
	Price FLOAT,
	Available BIT,
	foreign key(ProductsID) references Products(ID),
	foreign key(ProvidersID) references Providers(ID)

);


