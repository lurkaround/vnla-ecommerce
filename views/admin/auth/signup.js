const layout = require('../layout');

module.exports = ({ req }) => {
  return layout({
    content: ` 
     <div>
     Your id is : ${req.session.userId}
    <form method="POST" action=''>
        <input name="email" type"text" placeholder="email" />
        <input name="password" type="password" placeholder="password" />
        <input name="passwordConfirmation" type="password" placeholder="confirm password" />
        <button>Sign Up</button>
    </form>
  </div>
    `,
  });
};
