'use strict';

const Homey = require('homey');

class Hombot extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit(eventName, listener) {
    this.log('Hombot App has been initialized');

    const startActionCard = this.homey.flow.getActionCard('start');
    startActionCard.addListener(async (args, state) => {
      this.log('Running the card: start with args=%s and state=%s', args, state);
    }, listener);

    const stopActionCard = this.homey.flow.getActionCard('stop');
    stopActionCard.addListener(async (args, state) => {
      this.log('Running the card: stop with args=%s and state=%s', args, state);
    }, listener);

    const homeActionCard = this.homey.flow.getActionCard('home');
    homeActionCard.addListener(async (args, state) => {
      this.log('Running the card: home with args=%s and state=%s', args, state);
    }, listener);

    const modeActionCard = this.homey.flow.getActionCard('mode');
    modeActionCard.addListener(async (args, state) => {
      this.log('Running the card: mode with args=%s and state=%s', args, state);
    }, listener);

    const turboActionCard = this.homey.flow.getActionCard('turbo');
    turboActionCard.addListener(async (args, state) => {
      this.log('Running the card: turbo with args=%s and state=%s', args, state);
    }, listener);
  }

}

module.exports = Hombot;
