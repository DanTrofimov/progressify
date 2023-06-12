module.exports = {
    meta: {
        type: "problem",
        schema: {},
        messages: {
            activationCheck: 'Service Worker. {{ info }}',
        },
    },
    create(context) {
        let fileStart = undefined;
        let isContainsSwActivation = false;

        return {
            'Program'(node) {
                fileStart = node;
            },
            CallExpression(node) {
                const callExpressionSelf = node.callee?.object?.name;
                const callExpressionAddListener = node.callee?.property?.name;
                const callExpressionActivate = node.arguments[0]?.value;

                const isAddLoadListener = callExpressionSelf === 'self' &&
                    callExpressionAddListener === 'addEventListener' &&
                    callExpressionActivate === 'activate'
                
                if (isAddLoadListener) {
                    isContainsSwActivation = true;
                }
            },
            'Program:exit'() {
                if (!isContainsSwActivation) {
                    context.report({ node: fileStart, messageId: 'activationCheck', data: {
                        info: 'Service Worker should handle activate event.'
                    }});
                    return;
                }
            }
        }
    }
};
