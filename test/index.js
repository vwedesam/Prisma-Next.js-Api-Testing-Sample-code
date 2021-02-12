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
