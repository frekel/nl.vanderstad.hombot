'use strict';

const Homey = require('homey');
const jsdom = require('jsdom');
const got = require('got');

const { JSDOM } = jsdom;

class Hombot extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('[App] has been initialized');

    const modeActionCard = this.homey.flow.getActionCard('set-cleaning-mode');
    modeActionCard.registerRunListener(async (args) => {
      this.log('[App] Running the card: set-cleaning-mode');
      const { mode } = args;
      const { device } = args;

      const command = `%7b%22COMMAND%22:%7b%22CLEAN_MODE%22:%22${mode}%22%7d%7d`;
      await this.sendCommand(command, device.getData());
    });

    const repeatActionCard = this.homey.flow.getActionCard('set-repeat-mode');
    repeatActionCard.registerRunListener(async (args) => {
      this.log('[App] Running the card: set-repeat-mode');
      const { repeat } = args;
      const { device } = args;

      const command = `%7b%22COMMAND%22:%7b%22REPEAT%22:%22${repeat}%22%7d%7d`;
      await this.sendCommand(command, device.getData());
    });

    const turboActionCard = this.homey.flow.getActionCard('set-turbo-mode');
    turboActionCard.registerRunListener(async (args) => {
      this.log('[App] Running the card: set-turbo-mode');
      const { turbo } = args;
      const { device } = args;

      const command = `%7b%22COMMAND%22:%7b%22TURBO%22:%22${turbo}%22%7d%7d`;
      await this.sendCommand(command, device.getData());
    });
  }

  async sendCommand(command, device) {
    this.log('[App] [sendCommand] Sending %s to %s', command, device.address);
    const url = `http://${device.address}:${device.port}/json.cgi?${command}`;
    this.log('[App] [sendCommand] Query url: ', url);
    got.get(url)
      .then((res) => {
        this.log('[App] [sendCommand] Status Code:', res.statusCode);
      })
      .catch((err) => {
        this.log('[App] [sendCommand] Error: ', err.message);
      });
  }

  async getExtraData(device) {
    this.log('[App] [getExtraData] Getting status for %s', device.address);
    const url = `http://${device.address}:${device.port}/status.html`;
    this.log('[App] [getExtraData] Query url %s', url);

    return got.get(url)
      .then((res) => {
        this.log('[App] [getExtraData] Status Code:', res.statusCode);
        let lastStatus = 'unknown';
        let nickName = device.id;
        const appStatus = {
          WORKING: 'cleaning',
          PAUSE: 'stopped',
          HOMING: 'docked',
          CHARGING: 'charging',
          BACKMOVING_INIT: 'cleaning',
        };

        try {
          const data = res.body;
          const dom = new JSDOM(data);

          lastStatus = dom.window.document.querySelector('status').textContent;
          nickName = dom.window.document.querySelector('nickname').textContent;
        } catch (error) {
          this.log('[App] [getExtraData] Warning: No information found from status page: %s', error.message);
        }

        return {
          status: appStatus[lastStatus],
          name: nickName,
        };
      })
      .catch((err) => {
        this.log('[App] [getExtraData] Error: status of discovered device %s is %s', device.id, err.message);
        return {
          status: 'unknown',
          name: device.name,
        };
      });
  }

}

module.exports = Hombot;
