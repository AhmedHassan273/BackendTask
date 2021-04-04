# Backend Task
In this task i created MSSQL DB tables (Products, Providers, ProductProvers, Categories) using DDL scripts then i connected my DB to my nodeJS server
after that i created endpoints to handle requests such as:

1. sending " / " request will send back ALL products as response.
2. sending " /category/CATID " will send back ALL products THAT has same CATID as sent in request.
3. sending " /product/toggle/PROID " will toggle a product by PROID as (set/unset) if its set you will see the product if you request it's category by id, if unset it will won't be featured in it's category.
4. if there's a product with multiple providers with different prices, you will get back your request's result containing ONLY the lowest price amongst all it's providers.
5. i included pagnation as query string " /category/id?page=NUM " where NUM is defaulted to 25.

Thank You.
