module.exports = {
    meta: {
        type: "problem",
        schema: {},
        messages: {
            installationCheck: 'Service Worker. {{ info }}',
        },
    },
    create(context) {
        let fileStart = undefined;
        let isContainsSwInstallation = false;

        return {
            'Program'(node) {
                fileStart = node;
            },
            CallExpression(node) {
                const callExpressionSelf = node.callee?.object?.name;
                const callExpressionAddListener = node.callee?.property?.name;
                const callExpressionInstall = node.arguments[0]?.value;

                const isAddLoadListener = callExpressionSelf === 'self' &&
                    callExpressionAddListener === 'addEventListener' &&
                    callExpressionInstall === 'install'
                
                if (isAddLoadListener) {
                    isContainsSwInstallation = true;
                }
            },
            'Program:exit'() {
                if (!isContainsSwInstallation) {
                    context.report({ node: fileStart, messageId: 'installationCheck', data: {
                        info: 'Service Worker should handle install event.'
                    }});
                    return;
                }
            }
        }
    }
};
