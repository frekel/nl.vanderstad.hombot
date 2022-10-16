'use strict';

const { Device } = require('homey');

class HomBotDevice extends Device {

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    this.log('HomBotDevice has been initialized');

    this.registerCapabilityListener('vacuumcleaner_state', async (value) => {
      this.log('Running the card: state with value=%s and options=%s', value);
      let command = 'unknown';
      switch (value) {
        case 'cleaning':
          command = '%7b%22COMMAND%22:%22CLEAN_START%22%7d';
          break;
        case 'docked':
          command = '%7b%22COMMAND%22:%22HOMING%22%7d';
          break;
        case 'stopped':
          command = '%7b%22COMMAND%22:%22PAUSE%22%7d';
          break;
        case 'spot_cleaning':
          command = 'unsupported';
          break;
        default:
          this.log('Found an unsupported action');
      }

      this.log('Execute the command: %s', command);
    });

    // this.setUnavailable(this.homey.__('device_unavailable')).catch(this.error);

    // this.setAvailable().catch(this.error);

    // Here we need to find out if the vacuum is changing state.
    // await this.setCapabilityValue('vacuumcleaner_state', 'stopped').catch(this.error);
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('HomBotDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings, newSettings, changedKeys }) {
    this.log('HomBotDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name) {
    this.log('HomBotDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('HomBotDevice has been deleted');
  }

}

module.exports = HomBotDevice;
