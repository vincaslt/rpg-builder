import * as F from 'fengari-web';
import * as eventSystem from '../engine/events';

/**
 * Exposes the same interface as eventSystem.registerEvent to Lua.
 */
function std_registerEvent(this: any, L: any) {
  const name = F.interop.tojs(L, 1);
  const handler = F.interop.tojs(L, 2);
  // const p = handler.toString();
  F.interop.push(L, 222);
  console.log(handler.apply(this, [1]));
  // eventSystem.registerEvent(name, (payload) => {
  //   console.log('exect', handler, payload);
  //   handler.apply(this, [123, 312]);
  // });
  return 0;
}

/**
 * Exposes the same interface as eventSystem.triggerEvent to Lua.
 */
const std_triggerEvent = (L: any) => {
  const name = F.interop.tojs(L, 1);
  const payload = F.interop.tojs(L, 2);
  eventSystem.triggerEvent(name, payload);
  return 0;
};

export function initializeGlobals() {
  F.lua.lua_pushjsfunction(F.L, std_registerEvent);
  F.lua.lua_setglobal(F.L, 'registerEvent');

  F.lua.lua_pushjsfunction(F.L, std_triggerEvent);
  F.lua.lua_setglobal(F.L, 'triggerEvent');
}
