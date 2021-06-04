const layout = require('../layout');

const getError = (errors, prop) => {
  // prop == email / pw / pwf
  try {
    return errors.mapped()[prop].msg;
  } catch (err) {
    return '';
  }
};

module.exports = ({ req, errors }) => {
  return layout({
    content: ` 
     <div>
     Your id is : ${req.session.userId}
    <form method="POST" action=''>
        <input name="email" type"text" placeholder="email" />
        ${getError(errors, 'email')}
        <input name="password" type="password" placeholder="password" />
        ${getError(errors, 'password')}
        <input name="passwordConfirmation" type="password" placeholder="confirm password" />
        ${getError(errors, 'passwordConfirmation')}
        <button>Sign Up</button>
    </form>
  </div>
    `,
  });
};
