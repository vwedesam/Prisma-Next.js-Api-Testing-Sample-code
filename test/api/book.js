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