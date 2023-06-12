module.exports = {
    meta: {
        type: "problem",
        schema: {},
        messages: {
            registationCheck: 'Service Worker isn`t registered correctly. {{ info }}',
        },
    },
    create(context) {

        let fileStart = undefined;
        let registrationNode = undefined;

        let isContainsSwRegistration = false;
        let isLoadEvent = false;
        let isNavigatorCheck = false;

        return {
            'Program'(node) {
                fileStart = node;
            },
            MemberExpression(node) {
                const memberExpressionNavigator = node.object?.object?.name;
                const memberExpressionSw = node.object?.property?.name;
                const memberExpressionRegister = node.property?.name;

                const isSwRegistrationExpression = memberExpressionNavigator === 'navigator' && 
                    memberExpressionSw === 'serviceWorker' && 
                    memberExpressionRegister === 'register';

                if (isSwRegistrationExpression) {
                    isContainsSwRegistration = true;
                    registrationNode = node;
                }
            },
            CallExpression(node) {
                const callExpressionWindow = node.callee?.object?.name;
                const callExpressionAddListener = node.callee?.property?.name;
                const callExpressionLoad = node.arguments[0]?.value;

                const isAddLoadListener = callExpressionWindow === 'window' &&
                    callExpressionAddListener === 'addEventListener' &&
                    callExpressionLoad === 'load'
                
                if (isAddLoadListener) {
                    isLoadEvent = true;
                }
            },
            IfStatement(node) {
                const ifStatementSw = node.test?.left?.value;
                const ifStatementOperator = node.test?.operator;
                const ifStatementNavigator = node.test?.right?.name;

                const isNavigatorCheckStatement = ifStatementSw === 'serviceWorker' &&
                    ifStatementOperator === 'in' &&
                    ifStatementNavigator === 'navigator';

                if (isNavigatorCheckStatement) {
                    isNavigatorCheck = true;
                }
            },
            'Program:exit'() {
                if (!isContainsSwRegistration) {
                    context.report({ node: fileStart, messageId: 'registationCheck', data: {
                        info: 'Service Worker should be registered.'
                    }});
                    return;
                }

                if (!isLoadEvent) {
                    context.report({ node: registrationNode, messageId: 'registationCheck', data: {
                        info: 'Service Worker registration should be inside of load event listener.'
                    }});
                    return;
                }

                if (!isNavigatorCheck) {
                    context.report({ node: registrationNode, messageId: 'registationCheck', data: {
                        info: 'Service Worker registration should be inside of `in navigator` check.'
                    }});
                    return;
                }
            }
        }
    }
};
