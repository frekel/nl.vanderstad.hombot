'use strict';

const Homey = require('homey');

class Hombot extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Hombot App has been initialized');

    const startActionCard = this.homey.flow.getActionCard('start');
    startActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: start with args=%s and state=%s', args, state);
    });

    const stopActionCard = this.homey.flow.getActionCard('stop');
    stopActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: stop with args=%s and state=%s', args, state);
    });

    const homeActionCard = this.homey.flow.getActionCard('home');
    homeActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: home with args=%s and state=%s', args, state);
    });

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
