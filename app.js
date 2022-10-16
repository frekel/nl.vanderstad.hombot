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
      if ('mode' in args) {
        this.log(`Execute the command: %7b%22COMMAND%22:%7b%22CLEAN_MODE%22:%22${args.mode}'%22%7d%7d'`);
      }
    });

    const turboActionCard = this.homey.flow.getActionCard('turbo');
    turboActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: turbo with args=%s and state=%s', args, state);
      if ('turbo' in args) {
        this.log(`Execute the command: %7b%22COMMAND%22:%7b%22TURBO%22:%22${args.turbo}'%22%7d%7d'`);
      }
    });
  }

}

module.exports = Hombot;
