/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable @typescript-eslint/no-explicit-any */

import * as F from 'fengari-web';
import * as eventSystem from '../engine/events';

/**
 * Exposes the same interface as eventSystem.registerEvent to Lua.
 */
function std_registerEvent(this: string, handler: any) {
  const name = this;
  eventSystem.registerEvent(name, (payload) => {
    handler.apply(payload, []);
  });
  return 0;
}

/**
 * Exposes the same interface as eventSystem.triggerEvent to Lua.
 */
function std_triggerEvent(this: string, payload: any) {
  const name = this;
  eventSystem.triggerEvent(name, payload);
  return 0;
}

export function initializeGlobals() {
  F.interop.push(F.L, std_registerEvent);
  F.lua.lua_setglobal(F.L, 'registerEvent');

  F.interop.push(F.L, std_triggerEvent);
  F.lua.lua_setglobal(F.L, 'triggerEvent');
}
