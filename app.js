'use strict';

const Homey = require('homey');
const { fetch } = require('node-fetch');

class Hombot extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('Hombot App has been initialized');

    const modeActionCard = this.homey.flow.getActionCard('mode');
    modeActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: mode with args=%s and state=%s', args, state);
      const { mode } = args;
      this.log(`Execute the command: %7b%22COMMAND%22:%7b%22CLEAN_MODE%22:%22${mode}%22%7d%7d`);
      await this.sendCommand(`%7b%22COMMAND%22:%7b%22CLEAN_MODE%22:%22${mode}%22%7d%7d`, this.homey.getDevice(this.homey.deviceId));
    });

    const turboActionCard = this.homey.flow.getActionCard('turbo');
    turboActionCard.registerRunListener(async (args, state) => {
      this.log('Running the card: turbo with args=%s and state=%s', args, state);
      const { turbo } = args;
      this.log(`Execute the command: %7b%22COMMAND%22:%7b%22TURBO%22:%22${turbo}%22%7d%7d`);
      await this.sendCommand(`%7b%22COMMAND%22:%7b%22TURBO%22:%22${turbo}%22%7d%7d`, this.homey.getDevice(this.homey.deviceId));
    });
  }

  async sendCommand(cmd, hostIP) {
    this.log('LG Hombot app - sending %s to %s', cmd, hostIP);

    try {
      const url = `http://${hostIP}:6260/json.cgi?${cmd}`;
      const response = await fetch(url);
      this.log(response);
      const json = await response.json();
      this.log(json);
    } catch (error) {
      this.log(error.response.body);
    }
  }

}

module.exports = Hombot;
