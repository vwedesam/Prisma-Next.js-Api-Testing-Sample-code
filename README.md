# Prisma-Next.js-Api-Testing-Sample-code

The **Sample** **Code** shows how to setup an environment for testing your **Next.js** Api endpoints with **Prisma**
> this Setup uses [mocha](https://mochajs.org/): feature-rich JavaScript test framework and [chai](https://www.chaijs.com): assertion library


##  Installation
```js
$ npm install create-next-app book-api

$ cd book-api

book-api/$ npm install --save-dev mocha 
book-api/$ npm install --save-dev chai chai-http

```

## Prisma
Prisma is an [open source](https://github.com/prisma/prisma) next-generation ORM. It consists of the following parts:

  -   **Prisma Client**  - **Prisma Migrate**  - **Prisma Studio**

Prisma Client can be used in _any_ Node.js (supported versions) or TypeScript backend application, or anything else that needs a database.

## Next.js

Next.js is an open-source React front-end development web framework that enables functionality such as server-side rendering and generating static websites for React based web applications.

### Sample Code 

#### 1 code prep
``` js
test/index.js

        const chai = require("chai")
        let chaiHttp = require("chai-http");
        const prisma = require("../../prisma")

        const server = 'http://localhost:3002';
        chai.use(chaiHttp);

        const expect = chai.expect;
        const should = chai.should();

        module.exports = {
            chai,
            server,
            expect,
            should,
            prisma
        }


``` 

### Config
 > add to package.json
``` js
    "mocha": {
        "spec": "test/api"
    }
```
 > to specify test directory for mocha
 
#### 2 Test Suite

```  js
test/api/book.js

const { server, chai, expect, prisma } = require("../index.js")

describe("book", () => {


    // USing Before Hook
    // IGNORE  FK CONSTRAINTS AND TRUNCATE BOOKS TABLE 
    before( async function(done) {
         // MYSQL
        prisma.$executeRaw('SET FOREIGN_KEY_CHECKS = 0;')
        .then(done());6
        prisma.$executeRaw('TRUNCATE TABLE books;')
        .then(done());
        
        // POSTGRESQL
        prisma.$executeRaw('TRUNCATE TABLE books cascade;')
        then(done());
      });
    
    it(" fetch all books ", async () => {

        chai.request(server)
            .get('/api/book')
            .send({})
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').with.lengthOf(7) // success
            });

    });

    it(" Add book ", async () => {

        chai.request(server)
            .post('/api/book')
            .send({ 
                title: " dead men tells no tale ",
                isbn: "157-jhfc",
                author: "vwedesam",
                year: 2002
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res.body).to.have.property('status').with.lengthOf(7) // success
            });

    });


});


``` 



## License

This project is released under the [MIT](http://opensource.org/licenses/MIT) license.
