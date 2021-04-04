USE backend_task 
Alter table ProductProviders
ADD FOREIGN KEY (ProvidersID)
REFERENCES Providers(ID);

Alter table ProductProviders
ADD FOREIGN KEY (ProductsID)
REFERENCES Products(ID);
