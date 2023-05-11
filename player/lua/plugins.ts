import * as F from 'fengari-web';
import { initializeGlobals } from './stdlib';

function initEventSystem() {
  const pluginQueue: (() => void)[] = [];

  initializeGlobals();

  /**
   * Loads and pushes the plugin into the queue.
   */
  async function loadPlugin(path: string) {
    const response = await fetch(path);
    const plugin = await response.text();
    pluginQueue.push(F.load(plugin));
  }

  /**
   * Executes all plugins in their load order.
   */
  function executePlugins() {
    for (const plugin of pluginQueue) {
      plugin();
    }
  }

  return {
    loadPlugin,
    executePlugins,
  };
}

export const { executePlugins, loadPlugin } = initEventSystem();
