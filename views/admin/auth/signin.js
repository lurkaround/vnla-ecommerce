const layout = require('../layout');

module.exports = () => {
  return layout({
    content: `
      <div>
        <form method="POST" action=''>
            <input name="email" type"text" placeholder="email" />
            <input name="password" type="password" placeholder="password" />
            <button>Sign In</button>
        </form>
      </div>
  `,
  });
};
