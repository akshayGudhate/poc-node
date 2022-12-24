
///////////////////////
//   redis caching   //
///////////////////////

const { Pool } = require('pg');

//
// the data mus be stored in the redis store in the below fashion(key: value)
// key = (query + parameterArray) as stringified
// value = data as object containing(rowCount and rows array)
//

//
// extend Pool class from pg to use for monkey patching
// create our own pool with cache logic
//
class CustomPool extends Pool {
    constructor (config) {
        // pass the config to actual Pool
        super(config);
        this.isCacheEnabled = false;
        // sample data
        this.data = {
            rowCount: 1,
            rows: [{
                product_id: 2,
                name: 'Net Protector Total Security (3 year)',
                initial: 'A',
                validity: 3
            }]
        };
    };

    useCache() {
        this.isCacheEnabled = true;
        return this;
    };

    // our version of query and cache logic
    myQuery(text, values, cb) {
        // if cache is selected
        if (this.isCacheEnabled) {
            console.log("Use cache!");
            // undo the cache selection
            this.isCacheEnabled = false;

            // send to cache db
            return new Promise(res => res(this.data));
        };

        // if cache is not selected
        console.log("Don't use cache!!");
        // send to actual db
        return this.query(text, values, cb);
    };
};

//
// query executions
//
// create pool
const pgPool = new CustomPool({ connectionString: process.env.database.url });

// with cache
pgPool.useCache().myQuery(`SELECT * FROM products WHERE product_id = $1`, [1]).then(v => console.log(v.rows[0]));
// without cache
pgPool.myQuery(`SELECT * FROM products WHERE product_id = $1`, [2]).then(v => console.log(v.rows[0].name));
// with cache
pgPool.useCache().myQuery(`SELECT * FROM products WHERE product_id = $1`, [3]).then(v => console.log(v.rows[0]));
