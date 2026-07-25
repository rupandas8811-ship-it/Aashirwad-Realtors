import bcrypt from 'bcryptjs';
console.log(bcrypt.compareSync('Welcome@123', '$2b$10$uVfHGjMEi0/7frP.9jtRZO7BM.bSq.DWSh/jak6MdlnaTIqVhfnsC'));
