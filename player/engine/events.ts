const eventRegistry: { [name: string]: ((payload?: any) => void)[] } = {};

export function registerEvent(name: string, handler: (payload?: any) => void) {
  if (eventRegistry[name]) {
    eventRegistry[name].push(handler);
  } else {
    eventRegistry[name] = [handler];
  }
}

export function triggerEvent(name: string, payload?: any) {
  eventRegistry[name].forEach((handler) => handler(payload));
}
