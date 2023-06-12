// no-empty-catch.spec.js
const { RuleTester } = require('eslint');
const activationRule = require('.');
const ruleTester = new RuleTester();

ruleTester.run('activation', activationRule, {
    valid: [{
        code: `self.addEventListener("activate", function(event) {
                event.waitUntil(self.registration.navigationPreload.enable());
            });`,
    }],
    invalid: [{
        code: `self.registration.navigationPreload.enable();`,
        errors: [{ messageId: 'activationCheck' }],
    },
  ]
});
