const pubsub = {
  events: {},
  subscribe(event, functionName) {
    pubsub.events[event] = pubsub.events[event] ?? [];
    pubsub.events[event].push(functionName);
  },
  publish(event, ...args) {
    const callStack = pubsub.events[event];
    if (!callStack) return;
    callStack.forEach((callbackFunction) => {
      callbackFunction(...args);
    });
  },
  usubscribe(event, functionName) {
    const callStack = pubsub.events[event];
    if (callStack) {
      callStack.splice(callStack.indexOf(functionName), 1);
    }
  },
};
export default pubsub;
