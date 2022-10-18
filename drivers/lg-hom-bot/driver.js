'use strict';

const { Driver } = require('homey');
const jsdom = require('jsdom');
const got = require('got');

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
    let pairingError = this.homey.__('no_devices_found');
    let pairingDevice = null;

    session.setHandler('list_devices', async (data) => {
      this.log('[onPair] In list_devices with data %s', data);

      if (pairingDevice !== null) {
        this.log('[onPair] In pairingDevice not null %s', pairingDevice);

        return [pairingDevice];
      }

      const discoveryResults = discoveryStrategy.getDiscoveryResults();
      const devices = await Promise.all(Object.values(discoveryResults)
        .map(async (discoveryResult) => {
          try {
            this.log('[onPair] Discovered the following results: ', discoveryResult.address);
            const extraData = this.homey.app.getExtraData(discoveryResult);

            return {
              name: extraData.name,
              data: {
                id: discoveryResult.id,
                address: discoveryResult.address,
                port: defaultPort,
              },
              store: {
                status: extraData.status,
              },
            };
          } catch (err) {
            this.error('Error: status of discovered device:%s with error:%s', discoveryResult.id, err);
            pairingError = this.homey.__('no_vacuums_found', err);

            return [];
          }
        }));

      if (devices.length <= 0) {
        this.log('[onPair] No device found. Start manual adding with message:%s', pairingError);
        session.showView('manual');
      }

      this.log('[onPair] Devices found: %s', devices);
      return devices;
    });

    session.setHandler('get_pairing_error', async () => {
      return pairingError;
    });

    session.setHandler('set_manual_device', async (data) => {
      this.log('[onPair]: In set_manual_device');

      try {
        pairingDevice = {
          name: `LG Hombot [${data.address}]`,
          data: {
            id: data.address,
            address: data.address,
            port: data.port,
          },
          store: {
            status: 'unknown',
          },
        };

        this.log('[onPair]: paringDevice: %s', pairingDevice);

        return Promise.resolve(pairingDevice);
      } catch (error) {
        this.log('[onPair]: error: %s', error);

        return Promise.reject(error);
      }
    });
  }

}

module.exports = HomBotDriver;
