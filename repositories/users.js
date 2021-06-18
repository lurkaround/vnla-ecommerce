const fs = require('fs');
const crypto = require('crypto');
const util = require('util');
const Repository = require('./repository');

const scrypt = util.promisify(crypto.scrypt);

class UsersRepository extends Repository {
  async create(attrs) {
    attrs.id = this.randomId();
    const salt = crypto.randomBytes(8).toString('hex');
    const buf = await scrypt(attrs.password, salt, 64);

    const records = await this.getAll();
    const record = {
      ...attrs,
      password: `${buf.toString('hex')}.${salt}`,
    };

    records.push(record);
    await this.writeAll(records);
    return record;
  }

  async comparePasswords(saved, supplied) {
    // saved => password saved in database -> hased.salt
    // supplied => pw given by user signing in
    // const result = saved.split('.');
    // const hashed = result[0];
    // const salt = result[1];
    const [hashed, salt] = saved.split('.');
    const hashedSuppliedBuf = await scrypt(supplied, salt, 64);
    return hashed === hashedSuppliedBuf.toString('hex');
  }
}

// const test = async () => {
//   const repo = new UsersRepository('users.json');
//   // await repo.create({ email: 'test@test.com', password: 'password' });
//   // const users = await repo.getAll();
//   // const user = await repo.getOne('6096e892');
//   // console.log(user);
//   // await repo.delete('6096e892');
//   // await repo.update('7186e892', { password: 'mypassword' });
//   const user = await repo.getOneBy({ email: 'test@test.com' });
//   console.log(user);
// };

// test();

module.exports = new UsersRepository('users.json');
