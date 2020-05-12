import { messageConstants } from '../context/_constants/message.constants'

export function createMessage(type, sender, receiver, content) {
    let message = {};
    switch (type) {
        case messageConstants.MESSAGE_TYPE.JOIN:
            message = {
                type,
                content: "JOIN",
                sender,
                receiver: "ALL",
                timestamp: Date.now() / 1000,
            };
            break;
        case messageConstants.MESSAGE_TYPE.TEXT:
        default:
            message = {
                type,
                content,
                sender,
                receiver,
                timestamp: Date.now() / 1000,
            };
    };
    return JSON.stringify(message);
}

export function onConnect(bugout, callback) {
    if (bugout.lastwirecount > 0) {
        callback();
    } else {
        setTimeout(() => onConnect(bugout, callback), 500)
    }
}