const express = require('express');
const sql = require('mssql');
const app = express();


var config = {
    user: 'ahmed',
    password: '123',
    server: 'localhost',
    database: 'backend_task'
};


const PORT = process.env.PORT || 5000;

function updatePrices() {

    sql.connect(config, function(err) {

        if (err) console.log(err);

        var request = new sql.Request();

        request.query(`update pp set Available = 0 
                from ProductProviders  pp
                inner join ProductProviders as B 
                on 
                pp.ProductsID = B.ProductsID AND
                pp.Price > B.Price;`, function(err) {

            if (err)
                console.log(err);
        });
    });
}

app.get('/', (req, res) => {

    sql.connect(config, function(err) {

        if (err) console.log(err);

        var request = new sql.Request();

        request.query(`select * from Products`, function(err, rows) {

            if (err) console.log(err);

            // send records as a response
            res.send(rows.recordset);
        });
    });
});

app.get(`/category/:categoryID`, (req, res) => {
    let id = req.params.categoryID;
    let page = req.query.page;
    page === 0 ? page++ : page;

    updatePrices();
    sql.connect(config, function(err) {

        if (err) console.log(err);

        var request = new sql.Request();

        request.query(`select P.ProductName,P.ID,PP.Price from Products As P join Categories As C
        on P.CategoryID = C.ID join ProductProviders As PP
        on PP.ProductsID = P.ID
        where C.ID = '${id}'
        AND PP.Available = 1
        order by P.ID
        offset  ${page - 1 || 0}*20 rows fetch next 25 rows only`, function(err, rows) {

            if (err) console.log(err);
            let Obj = rows.recordset;
            // send records as a response
            if (Obj.length < 1) {
                res.status(404).send('404 NOT FOUND');
            } else {
                res.send(Obj);
            }
        });
    });
});

app.put('/product/toggle/:productID', (req, res) => {
    let id = req.params.productID;
    sql.connect(config, function(err) {

        if (err) console.log(err);

        var request = new sql.Request();

        request.query(`update ProductProviders set ProductProviders.Available = ~ProductProviders.Available
        where ProductProviders.ProductsID = '${id}'`, function(err) {

            if (err) {
                console.log(err);
                res.status(404).send('404 NOT FOUND');
            } else {
                res.status(200).send('200 OK');
            }
        });
    });
});

app.listen(PORT, console.log('server is running..'));