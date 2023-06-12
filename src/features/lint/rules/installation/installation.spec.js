// no-empty-catch.spec.js
const { RuleTester } = require('eslint');
const installationRule = require('.');
const ruleTester = new RuleTester();

ruleTester.run('installation', installationRule, {
    valid: [{
        code: `self.addEventListener("install", function(event) {
                event.waitUntil(self.registration.navigationPreload.enable());
            });`,
    }],
    invalid: [{
        code: `self.registration.navigationPreload.enable();`,
        errors: [{ messageId: 'installationCheck' }],
    },
  ]
});
