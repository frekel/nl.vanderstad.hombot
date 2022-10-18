'use strict';

const { Device } = require('homey');

class HomBotDevice extends Device {

  async onInit() {
    this.log('HomBotDevice has been initialized');

    this.registerCapabilityListener('vacuumcleaner_state', async (value) => {
      this.log('[onInit] Running the card: state with value=%s and options=%s', value);
      let command = null;
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
          command = '%7b%22COMMAND%22:%22CLEAN_START%22%7d';
          break;
        default:
          this.log('[onInit] Found an unsupported action: ', value);
      }

      this.log('[onInit] Execute the command: %s', command);
      if (command) {
        this.homey.app.sendCommand(command, this.getData());
      }
    });

    // Here we need to find out if the vacuum is changing state.
    this.homey.app.getExtraData(this.getData())
      .then((data) => {
        this.log('[onInit] Getting data: %s ', data);
        try {
          this.setAvailable();
          const { status } = data;
          this.setCapabilityValue('vacuumcleaner_state', status).catch(this.error);
        } catch (error) {
          this.log('[onInit] Setting setCapabilityValue failed for status: %s ', data.status, error);
          this.setUnavailable(this.homey.__('device_unavailable')).catch(this.error);
        }
      }).catch((err) => {
        // we can not possibly have completed the command here, as it ended up in the catch
        this.log('[onInit] Getting error when trying to se tthe state: %s ', err);
        this.setUnavailable(this.homey.__('device_unavailable')).catch(this.error);
      });
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
