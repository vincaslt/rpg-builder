import Phaser from 'phaser';
import '../lua/plugins';
import * as luaPlugins from '../lua/plugins';
import * as eventSystem from './events';

// TODO: have player load everything

class Example extends Phaser.Scene {
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    this.add.image(400, 300, 'sky');
    eventSystem.triggerEvent('system:create', { payload: 321 });
  }

  update() {
    // TODO
  }
}

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: Example,
};

eventSystem.registerEvent('system:create', (payload: any) => {
  console.log('Create triggered on JS side, with payload:', payload);
});

eventSystem.registerEvent('user:custom', (payload: any) => {
  console.log('Custom event triggered from Lua, with payload:', payload);
});

async function run() {
  await luaPlugins.loadPlugin('plugins/test.lua');

  luaPlugins.executePlugins();

  new Phaser.Game(config);
}

run();
