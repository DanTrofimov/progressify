// no-empty-catch.spec.js
const { RuleTester } = require('eslint');
const registrationRule = require('.');
const ruleTester = new RuleTester();

ruleTester.run('registration', registrationRule, {
    valid: [{
        code: `if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/service-worker.js');
                });
              }`,
    }],
    invalid: [{
        code: `if ('serviceWorker' in navigator) {}`,
        errors: [{ messageId: 'registationCheck' }],
    },
    {
      code: `window.addEventListener('load', function() {
          navigator.serviceWorker.register('/service-worker.js');
        });`,
        errors: [{ messageId: 'registationCheck' }],
    },
    {
      code: `navigator.serviceWorker.register('/service-worker.js');`,
        errors: [{ messageId: 'registationCheck' }],
    },
  ]
});
