'use strict';

const Homey = require('homey');

class Hombot extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Hombot App has been initialized');

    const modeActionCard = this.homey.flow.getActionCard('mode');
    modeActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: mode with args=%s and state=%s', args, state);
    });

    const turboActionCard = this.homey.flow.getActionCard('turbo');
    turboActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: turbo with args=%s and state=%s', args, state);
    });
  }

}

module.exports = Hombot;
