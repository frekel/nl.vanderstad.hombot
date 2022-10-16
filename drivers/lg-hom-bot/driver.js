'use strict';

const { Driver } = require('homey');
const { fetch } = require('node-fetch');
const jsdom = require('jsdom');

const { JSDOM } = jsdom;

class HomBotDriver extends Driver {

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('HomBotDriver has been initialized');
  }

  async onPair(session) {
    const discoveryStrategy = this.getDiscoveryStrategy();
    const defaultPort = 6260;
    let pairingError = '';
    let pairingDevice = null;

    session.setHandler('list_devices', async () => {
      if (pairingDevice !== null) {
        return [pairingDevice];
      }

      const discoveryResults = discoveryStrategy.getDiscoveryResults();
      const devices = await Promise.all(Object.values(discoveryResults)
        .map(async (discoveryResult) => {
          try {
            this.log('Discovered the following results: %s', discoveryResult);
            const url = `http://${discoveryResult.address}:${defaultPort}/status.txt`;
            const res = await fetch(url);
            if (res.ok === false) {
              pairingError = 'No correct status from vacuum';
              this.log('Error: status of discovered device %s is %s', discoveryResult.id, res.statusText);

              return [];
            }
            const data = await res.text();
            const dom = new JSDOM(data);
            const lastStatus = dom.window.document.querySelector('status').textContent;
            const nickname = dom.window.document.querySelector('nickname').textContent;
            this.log('Success: status of discovered device %s is %s', discoveryResult.id, data);

            devices.push({
              id: discoveryResult.id,
              name: nickname,
              data: {
                id: discoveryResult.id,
                address: discoveryResult.address,
                port: defaultPort,
              },
              store: {
                address: discoveryResult.address,
                port: discoveryResult.port,
                status: lastStatus,
              },
            });

            return devices;
          } catch (err) {
            this.error('Error: status of discovered device %s is %s', discoveryResult.id, err);
            pairingError = `No vacuums found: ${err}`;

            return [];
          }
        }));

      this.log('Devices found: %s', devices);
      if (devices.length <= 0) {
        session.showView('manual');
      } else {
        return devices;
      }
    });

    session.setHandler('get_pairing_error', async () => {
      return pairingError;
    });

    session.setHandler('set_pairing_error', async (val) => {
      pairingError = val;
    });

    session.setHandler('set_manual_device', (data, callback) => {
      // Continue to next view
      session.showView('loading');

      pairingDevice = {
        id: data.address,
        name: `LG Hombot [${data.address}]`,
        data: {
          id: data.address,
          address: data.address,
          port: data.port,
        },
        store: {
          address: data.address,
          port: data.port,
        },
      };

      session.showView('list_devices');
    });
  }

}

module.exports = HomBotDriver;
