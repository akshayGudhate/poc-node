const https = require('https');
const crypto = require('crypto');
const fs = require('fs');

process.env.UV_THREADPOOL_SIZE = 6;

// start time
const start = Date.now();


//
// hashing function
//
function doHash() {
    return crypto.pbkdf2('a', 'b', 100000, 512, 'sha512', () => {
        console.log('Hash: ', Date.now() - start);
    });
};


//
// network request function
//
function doRequest() {
    return https.request('https://google.com', res => {
        res.on('data', () => { });
        res.on('end', () => { console.log('Req: ', Date.now() - start); });
    }).end();
};


//
// read file function
//
function doFileRead() {
    fs.readFile('test.js', 'utf-8', () => {
        console.log('FS: ', Date.now() - start);
    });
};


//
// event loop not works on crypto package
// it uses the multi-threading using libuv model
// the default thread pool size is 4 threads
// we can manipulate that with process.env.UV_THREADPOOL_SIZE variable.
//

doHash();
doHash();
doHash();
doHash();
doHash();
doHash();


//
// when we make network request its completely depends on os(linux, mac, windows)
// so this code does not touch thread pool of libuv
// no limitation of the threads here as managed by os directly
//

doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();
doRequest();


///////////////////////
//   multi tasking   //
///////////////////////

//
// here file system will is handled by event loop in deferent way
// it will first fetch the stats and then
// when the next thread is empty it will read the file content as callback
// so the threads are getting distributed in hash and fs module
// here if we increase the thread pool size then you can see different results
//

doRequest();
doRequest();

doFileRead();
doFileRead();

doHash();
doHash();
doHash();
doHash();
