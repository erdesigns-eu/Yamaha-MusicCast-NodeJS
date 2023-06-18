const axios = require('axios');
const dgram = require('dgram');

/**
 * @unit yamaha-musiccast.js
 * @description Yamaha MusicCast API class. I have created this class to control my Yamaha RX-V583 receiver from my Electron app.
 * @version 1.0.0
 * @author Ernst Reidinga - ERDesigns
 * @copyrigth ERDesigns 2023
 * @license MIT
 * @exports YamahaMusicCast
 */

/**
 * @class YamahaMusicCastSystem
 * @description Yamaha MusicCast System API class.
 * @version 1.0.0
 * @exports YamahaMusicCastSystem
 * @requires axios
 */
class YamahaMusicCastSystem {
  #ip;
  #eventPort;
  #axiosInstance;
  
  /**
   * @constructor YamahaMusicCastSystem
   * @param {string} ip
   * @param {number} eventPort
   * @description Creates an instance of YamahaMusicCastSystem.
   * @returns {YamahaMusicCastSystem}
   * @version 1.0.0 
   */
  constructor(ip, eventPort) {
    this.setup(ip, eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCastSystem instance.
   * @version 1.0.0
   * @private 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port (UDP - default 41100)
    this.#eventPort = eventPort;
    // Create an axios instance
    this.#axiosInstance = axios.create({
      baseURL: `http://${this.#ip}:80/YamahaExtendedControl/v1/system`,
      timeout: 15 * 1000,
      headers: {
        'X-AppName': 'ERDesigns/1.0',
        'X-AppPort': this.#eventPort,
      },
    });
  }

  /**
   * @method getDeviceInfo
   * @description Gets the device information.
   * @returns {Promise}
   * @public
   */
  getDeviceInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getDeviceInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getFeatures
   * @description Gets the features of the device.
   * @returns {Promise}
   * @public
   */
  getFeatures() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getFeatures')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getNetworkStatus
   * @description Gets the network status of the device.
   * @returns {Promise}
   * @public
   */
  getNetworkStatus() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getNetworkStatus')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setWiredLan
   * @param {object} options
   * @param {boolean} options.dhcp
   * @param {string} options.ipAddress
   * @param {string} options.subnetMask
   * @param {string} options.defaultGateway
   * @param {string} options.dnsServer1
   * @param {string} options.dnsServer2
   * @description Sets the wired LAN settings of the device.
   * @returns {Promise}
   * @public
   */
  setWiredLan(options = { 
    dhcp: false, 
    ipAddress: '', 
    subnetMask: '', 
    defaultGateway: '', 
    dnsServer1: '', 
    dnsServer2: ''
  }) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setWiredLan', options)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setWirelessLan
   * @param {object} options
   * @param {string} options.ssid
   * @param {string} options.type
   * @param {string} options.key
   * @param {boolean} options.dhcp
   * @param {string} options.ipAddress
   * @param {string} options.subnetMask
   * @param {string} options.defaultGateway
   * @param {string} options.dnsServer1
   * @param {string} options.dnsServer2
   * @description Sets the wireless LAN settings of the device.
   * @returns {Promise}
   * @public
   */
  setWirelessLan(options = {
    ssid: '',
    type: 'mixed_mode',
    key: '',
    dhcp: '',
    ipAddress: '',
    subnetMask: '',
    defaultGateway: '',
    dnsServer1: '',
    dnsServer2: ''
  }) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setWirelessLan', options)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setIPSettings
   * @param {object} options
   * @param {boolean} options.dhcp
   * @param {string} options.ipAddress
   * @param {string} options.subnetMask
   * @param {string} options.defaultGateway
   * @param {string} options.dnsServer1
   * @param {string} options.dnsServer2
   * @description Sets the IP settings of the device.
   * @returns {Promise}
   * @public
   */
  setIPSettings(options = {
    dhcp: '',
    ipAddress: '',
    subnetMask: '',
    defaultGateway: '',
    dnsServer1: '',
    dnsServer2: ''
  }) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setIpSettings', options)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setNetworkName
   * @param {string} name Must not be longer than 32 characters.
   * @description Sets the network name of the device.
   * @returns {Promise}
   * @public
   */
  setNetworkName(name) {
    return new Promise((resolve, reject) => {
      if (name.length > 32) {
        return reject(new Error('The network name must not be longer than 32 characters.'));
      }
      this.#axiosInstance
        .post('/setNetworkName', { name })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setAirPlayPin
   * @param {string} pin
   * @description Sets the AirPlay PIN of the device.
   * @returns {Promise}
   * @public
   */
  setAirPlayPin(pin) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setAirPlayPin', { pin })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getMacAddressFilter
   * @description Gets the MAC address filter of the device.
   * @returns {Promise}
   * @public
   */
  getMacAddressFilter() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getMacAddressFilter')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.mac_address_filter);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setMacAddressFilter
   * @param {object} options
   * @param {boolean} options.filter
   * @param {string} options.address_1
   * @param {string} options.address_2
   * @param {string} options.address_3
   * @param {string} options.address_4
   * @param {string} options.address_5
   * @param {string} options.address_6
   * @param {string} options.address_7
   * @param {string} options.address_8
   * @param {string} options.address_9
   * @param {string} options.address_10
   * @description Sets the MAC address filter of the device.
   * @returns {Promise}
   * @public
   */
  setMacAddressFilter(options = {
    filter: false,
    address_1: '',
    address_2: '',
    address_3: '',
    address_4: '',
    address_5: '',
    address_6: '',
    address_7: '',
    address_8: '',
    address_9: '',
    address_10: ''
  }) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setMacAddressFilter', options)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.mac_address_filter);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getNetworkStandby
   * @description Gets the network standby of the device.
   * @returns {Promise}
   * @public
   */
  getNetworkStandby() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getNetworkStandby')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.network_standby);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setNetworkStandby
   * @param {string} standby 'on', 'off' or 'auto'
   * @description Sets the network standby of the device.
   * @returns {Promise} 
   */
  setNetworkStandby(standby = 'auto') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setNetworkStandby', { params: { standby } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.network_standby);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getBluetoothInfo
   * @description Gets the bluetooth info of the device.
   * @returns {Promise}
   * @public
   */
  getBluetoothInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getBluetoothInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.bluetooth_info);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setBluetoothStandby
   * @param {boolean} standby
   * @description Sets the bluetooth standby of the device.
   * @returns {Promise}
   */
  setBluetoothStandby(standby = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setBluetoothStandby', { params: { standby } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.bluetooth_standby);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setBluetoothTxSetting
   * @param {boolean} enable
   * @description Sets the bluetooth tx setting of the device.
   * @returns {Promise}
   * @public
   */
  setBluetoothTxSetting(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setBluetoothTxSetting', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res.bluetooth_tx_setting);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getBluetoothDeviceList
   * @description Gets the bluetooth device list of the device.
   * @returns {Promise}
   * @public
   */
  getBluetoothDeviceList() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getBluetoothDeviceList')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method updateBluetoothDeviceList
   * @description Updates the bluetooth device list of the device.
   * @returns {Promise}
   * @public
   */
  updateBluetoothDeviceList() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/updateBluetoothDeviceList')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method connectBluetoothDevice
   * @param {string} address
   * @description Connects the bluetooth device of the device.
   * @returns {Promise}
   */
  connectBluetoothDevice(address = '') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/connectBluetoothDevice', { params: { address } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method disconnectBluetoothDevice
   * @description Disconnects the bluetooth device of the device.
   * @returns {Promise}
   * @public
   */
  disconnectBluetoothDevice() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/disconnectBluetoothDevice')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getFuncStatus
   * @description Gets the function status of the device.
   * @returns {Promise}
   * @public
   */
  getFuncStatus() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getFuncStatus')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setAutoPowerStandby
   * @param {boolean} enable
   * @description Sets the auto power standby of the device.
   * @returns {Promise}
   */
  setAutoPowerStandby(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setAutoPowerStandby', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setIrSensor
   * @param {boolean} enable
   * @description Sets the ir sensor of the device.
   * @returns {Promise}
   */
  setIrSensor(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setIrSensor', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setSpeakerA
   * @param {boolean} enable
   * @description For setting Speaker A status
   * @returns {Promise}
   * @public
   */
  setSpeakerA(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setSpeakerA', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setSpeakerB
   * @param {boolean} enable
   * @description For setting Speaker B status
   * @returns {Promise}
   * @public
   */
  setSpeakerB(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setSpeakerB', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setDimmer
   * @param {boolean} enable
   * @description For setting FL/LED Dimmer 
   */
  setDimmer(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setDimmer', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setZoneBVolumeSync
   * @param {boolean} enable
   * @description For setting Zone B Volume Sync
   */
  setZoneBVolumeSync(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setZoneBVolumeSync', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setHdmiOut1
   * @param {boolean} enable
   * @description For setting HDMI OUT 1 terminal output status
   * @returns {Promise}
   * @public
   */
  setHdmiOut1(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setHdmiOut1', { params: { enable } })
        .then((response) => {
          const res = response.data
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setHdmiOut2
   * @param {boolean} enable
   * @description For setting HDMI OUT 2 terminal output status
   * @returns {Promise}
   * @public
   */
  setHdmiOut2(enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setHdmiOut2', { params: { enable } })
        .then((response) => {
          const res = response.data
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method getNameText
   * @param {string} id
   * @description For retrieving text information of Zone, Input, Sound program. If they can be renamed, can retrieve text information renamed.
   * @returns {Promise}
   */
  getNameText(id = '') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getNameText', { params: { id } })
        .then((response) => {
          const res = response.data
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setNameText
   * @param {string} id
   * @param {string} text
   * @description For setting text information related to each ID of Zone, Input.
   */
  setNameText(id, text) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setNameText', { id, text })
        .then((response) => {
          const res = response.data
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method getLocationInfo
   * @description For retrieving location information of the device.
   * @returns {Promise}
   * @public
   */
  getLocationInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getLocationInfo')
        .then((response) => {
          const res = response.data
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  sendIrCode(code) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/sendIrCode', { params: { code } })
        .then((response) => {
          const res = response.data
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }



}

/**
 * @class YamahaMusicCastZone
 * @description For retrieving basic information of each Zone like power, volume, input and so on
 * @version 1.0.0
 * @exports YamahaMusicCastZone
 * @requires axios
 */
class YamahaMusicCastZone {
  #ip;
  #eventPort;
  #axiosInstance;
  
  /**
   * @constructor YamahaMusicCastZone
   * @param {string} ip
   * @param {number} eventPort
   * @description Creates an instance of YamahaMusicCastZone.
   * @version 1.0.0
   * @public 
   */
  constructor(ip, eventPort) {
    this.setup(ip, eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCastZone instance.
   * @version 1.0.0
   * @private 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port (UDP - default 41100)
    this.#eventPort = eventPort;
    // Create an axios instance
    this.#axiosInstance = axios.create({
      baseURL: `http://${this.#ip}:80/YamahaExtendedControl/v1`,
      timeout: 15 * 1000,
      headers: {
        'X-AppName': 'ERDesigns/1.0',
        'X-AppPort': this.#eventPort,
      },
    });
  }

  /**
   * @method getStatus
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @description For retrieving basic information of each Zone like power, volume, input and so on.
   * @returns {Promise}
   */
  getStatus(zone) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/getStatus`)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getSoundProgramList
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @description For retrieving list of Sound programs.
   * @returns {Promise}
   * @public
   */
  getSoundProgramList(zone) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/getSoundProgramList`)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setPower
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} power - on, standby, toggle
   */
  setPower(zone, power = 'on') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setPower`, { params: { power } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setSleep
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {number} sleep - 0, 30, 60, 90, 120 (minutes)
   * @description For setting sleep timer.
   * @returns {Promise}
   * @public 
   */
  setSleep(zone, sleep = 0) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setSleep`, { params: { sleep } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setVolume
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {number} volume
   * @param {number} step - 1-10
   * @description For setting volume.
   * @returns {Promise}
   */
  setVolume(zone, volume, step = 1) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setVolume`, { params: { volume, step } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setMute
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable
   * @description For setting mute.
   * @returns {Promise}
   * @public
   */
  setMute(zone, enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setMute`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setInput
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} input Input IDs gotten via /getFeatures
   * @param {string} mode - autoplay_enabled, autoplay_disabled.
   * @description For setting input.
   * @returns {Promise}
   * @public
   */
  setInput(zone, input, mode = 'autoplay_disabled') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setInput`, { params: { input, mode } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setSoundProgram
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} program - Program IDs gotten via /getFeatures
   * @description For setting sound program.
   * @returns {Promise}
   * @public
   */
  setSoundProgram(zone, program) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setSoundProgram`, { params: { program } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method set3dSurround
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable
   * @description For setting 3D surround status.
   * @returns {Promise}
   * @public
   */
  set3dSurround(zone, enable = false) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/set3dSurround`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setDirect  
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable
   * @description For setting direct status.
   * @returns {Promise}
   * @public
   */
  setDirect(zone, enable = false) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setDirect`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setPureDirect
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable
   * @description For setting pure direct status.
   * @returns {Promise}
   * @public
   */
  setPureDirect(zone, enable = false) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setPureDirect`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setEnhancer
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable
   * @description For setting enhancer status.
   * @returns {Promise}
   * @public
   */
  setEnhancer(zone, enable = true) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setEnhancer`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setToneControl
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} mode - manual, bypass
   * @param {number} bass - Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @param {number} treble - Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @description For setting tone control.
   * @returns {Promise}
   * @public
   */
  setToneControl(zone, mode, bass, treble) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setToneControl`, { params: { mode, bass, treble } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setEqualizer
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} mode - manual, bypass
   * @param {number} low - Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @param {number} mid - Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @param {number} high - Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @description For setting equalizer.
   * @returns {Promise}
   * @public
   */
  setEqualizer(zone, mode, low, mid, high) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setEqualizer`, { params: { mode, low, mid, high } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setBalance
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {number} value - For setting L/R Balance in each Zone’s speaker. Values of specifying range and steps are different.
   * @description For setting L/R Balance in each Zone’s speaker. Values of specifying range and steps are different.
   * @returns {Promise}
   * @public
   */
  setBalance(zone, value) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setBalance`, { params: { value } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setDialogueLevel
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {number} value - Specifies Dialogue Level value Values: Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @description For setting Dialogue Level in each Zone’s speaker. Values of specifying range and steps are different.
   * @returns {Promise}
   * @public
   */
  setDialogueLevel(zone, value) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setDialogueLevel`, { params: { value } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setDialogueLift
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {number} value - Specifies Dialogue Lift value Values: Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @description For setting Dialogue Lift in each Zone’s speaker. Values of specifying range and steps are different.
   * @returns {Promise}
   * @public
   */
  setDialogueLift(zone, value) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setDialogueLift`, { params: { value } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setClearVoice
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable - Specifies Clear Voice value Values: true, false
   * @description For setting Clear Voice in each Zone.
   * @returns {Promise}
   * @public
   */
  setClearVoice(zone, enable) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setClearVoice`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setSubwooferVolume
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {number} volume - Specifies Subwoofer Volume value Values: Value range calculated by minimum/maximum/step values gotten via /getFeatures
   * @description For setting Subwoofer Volume in each Zone.
   * @returns {Promise}
   * @public
   */
  setSubwooferVolume(zone, volume) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setSubwooferVolume`, { params: { volume } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setBassExtension
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {boolean} enable - Specifies Bass Extension value Values: true, false
   * @description For setting Bass Extension in each Zone.
   * @returns {Promise}
   * @public
   */
  setBassExtension(zone, enable) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/setBassExtension`, { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getSignalInfo
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @description For retrieving current playback signal information in each Zone
   * @returns {Promise}
   * @public
   */
  getSignalInfo(zone) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/getSignalInfo`)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method prepareInputChange 
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} input - Specifies input name Values: gotten via /getFeatures
   * @description Let a Device do necessary process before changing input in a specific zone. This is valid only when “prepare_input_change” exists in “func_list” found in /getFuncStatus. MusicCast CONTROLLER executes this API when an input icon is selected in a Room, right before sending various APIs (of retrieving list information etc.) regarding selecting input.
   * @returns {Promise}
   * @public
   */
  prepareInputChange(zone, input) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`${zone}/prepareInputChange`, { params: { input } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}

/**
 * @class YamahaMusicCastTuner
 * @description APIs in regard to Tuner setting and getting information.
 * @version 1.0.0
 * @exports YamahaMusicCastTuner
 * @requires axios
 */
class YamahaMusicCastTuner {
  #ip;
  #eventPort;
  #axiosInstance;
  
  /**
   * @constructor YamahaMusicCastTuner
   * @param {string} ip
   * @param {number} eventPort
   * @description Creates an instance of YamahaMusicCastTuner.
   * @version 1.0.0
   * @public 
   */
  constructor(ip, eventPort) {
    this.setup(ip, eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCastTuner instance.
   * @version 1.0.0
   * @private 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port (UDP - default 41100)
    this.#eventPort = eventPort;
    // Create an axios instance
    this.#axiosInstance = axios.create({
      baseURL: `http://${this.#ip}:80/YamahaExtendedControl/v1/tuner`,
      timeout: 15 * 1000,
      headers: {
        'X-AppName': 'ERDesigns/1.0',
        'X-AppPort': this.#eventPort,
      },
    });
  }

  /**
   * @method getTunerInfo
   * @param {string} band - fm, am, dab
   * @description For retrieving Tuner preset information.
   * @returns {Promise}
   * @public
   */
  getPresetInfo(band = 'fm') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`/getPresetInfo`, { params: { band } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getPlayInfo
   * @description For retrieving Tuner playback information.
   * @returns {Promise}
   * @public
   */
  getPlayInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`/getPlayInfo`)
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        })
    });
  }

  /**
   * @method setBand
   * @param {string} band - fm, am, dab
   * @description For setting Tuner band.
   * @returns {Promise}
   * @public
   */
  setBand(band = 'fm') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`/setBand`, { params: { band } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error)
        });
    });
  }

  /**
   * @method setFreq
   * @param {string} band - fm, am
   * @param {string} tuning - Specifies a tuning method. Use "tp_up" and "tp_down" only when Band is RDS. Values: "up" / "down" / "cancel" / "auto_up" / "auto_down" / "tp_up" / "tp_down" / "direct"
   * @param {number} num - 1-40
   * @description For setting Tuner frequency.
   * @returns {Promise}
   * @public
   */
  setFreq(band, tuning, num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get(`/setFreq`, { params: { band, tuning, num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method recallPreset
   * @param {string} zone - Main_Zone, Zone_2, Zone_3, Zone_4
   * @param {string} band - fm, am, dab
   * @param {number} num - Specifies Preset number. Value: one in the range gotten via /getFeatures
   * @description For recalling Tuner preset.
   * @returns {Promise}
   * @public
   */
  recallPreset(zone, band, num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/recallPreset', { params: { zone, band, num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method switchPreset
   * @param {string} dir - Specifies change direction of preset. Values: "next" / "previous"
   * @description For switching Tuner preset.
   * @returns {Promise}
   * @public
   */
  switchPreset(dir) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/switchPreset', { params: { dir } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method storePreset
   * @param {number} num - Specifies Preset number. Value: one in the range gotten via /getFeatures
   * @description For storing Tuner preset.
   * @returns {Promise}
   * @public
   */
  storePreset(num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/storePreset', { params: { num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method clearPreset
   * @param {string} band - fm, am, dab
   * @param {number} num - Specifies Preset number. Value: one in the range gotten via /getFeatures
   * @description For clearing Tuner preset.
   * @returns {Promise}
   * @public
   */
  clearPreset(band, num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/clearPreset', { params: { band, num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method startAutoPreset
   * @param {string} band - fm, am, dab
   * @description For starting Tuner auto preset.
   * @returns {Promise}
   * @public
   */
  startAutoPreset(band) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/startAutoPreset', { params: { band } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method cancelAutoPreset
   * @param {string} band - fm
   * @description For canceling Auto Preset. Available only when "fm_auto_preset" exists in tuner - func_list under /getFeatures
   * @returns {Promise}
   * @public
   */
  cancelAutoPreset(band = 'fm') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/cancelAutoPreset', { params: { band } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method movePreset
   * @param {string} band - fm, am, dab
   * @param {number} from - Specifies Preset number. Value: one in the range gotten via /getFeatures
   * @param {number} to - Specifies Preset number. Value: one in the range gotten via /getFeatures
   * @description For moving Tuner preset.
   * @returns {Promise}
   * @public
   */
  movePreset(band, from, to) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/movePreset', { params: { band, from, to } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method startDabInitialScan 
   * @description For starting DAB Initial Scan. Available only when " dab_initial_scan " exists in tuner - func_list under /getFeatures.
   * @returns {Promise}
   * @public
   */
  startDabInitialScan() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/startDabInitialScan')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method cancelDabInitialScan
   * @description For canceling DAB Initial Scan. Available only when " dab_initial_scan " exists in tuner - func_list under /getFeatures.
   * @returns {Promise}
   * @public
   */
  cancelDabInitialScan() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/cancelDabInitialScan')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setDabTuneAid
   * @param {string} action - start, stop, up, down 
   * @description For setting DAB Tune Aid. Available only when " dab_tune_aid " exists in tuner - func_list under /getFeatures.
   * @returns {Promise}
   * @public
   */
  setDabTuneAid(action) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setDabTuneAid', { params: { action } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setDabService
   * @param {string} dir - up, down
   * @description For setting DAB Service. Available only when " dab_service " exists in tuner - func_list under /getFeatures.
   * @returns {Promise}
   * @public
   */
  setDabService(dir = 'up') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setDabService', { params: { dir } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}

/**
 * @class YamahaMusicCastNetworkUSB
 * @description Class that handles all the Yamaha MusicCast Network USB API endpoints.
 * @version 1.0.0
 * @exports YamahaMusicCastNetworkUSB
 * @requires axios
 */
class YamahaMusicCastNetworkUSB {
  #ip;
  #eventPort;
  #axiosInstance;

  /**
   * @method constructor
   * @param {string} ip
   * @param {number} eventPort
   * @description Creates an instance of YamahaMusicCastNetworkUSB.
   * @version 1.0.0 
   */
  constructor(ip, eventPort) {
    this.setup(ip, eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCastNetworkUSB instance.
   * @version 1.0.0
   * @private 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port (UDP - default 41100)
    this.#eventPort = eventPort;
    // Create an axios instance
    this.#axiosInstance = axios.create({
      baseURL: `http://${this.#ip}:80/YamahaExtendedControl/v1/netusb`,
      timeout: 15 * 1000,
      headers: {
        'X-AppName': 'ERDesigns/1.0',
        'X-AppPort': this.#eventPort,
      },
    });
  }

  /**
   * @method getPresetInfo
   * @description For retrieving preset information. Presets are common use among Net/USB related input sources.
   * @returns {Promise}
   * @public
   */
  getPresetInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getPresetInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getPlayInfo
   * @description For retrieving playback information.
   * @returns {Promise}
   * @public
   */
  getPlayInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getPlayInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res)
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setPlayback
   * @param {string} playback - Specifies playback status. Values: "play" / "stop" / "pause" / "play_pause" / "previous" / "next" / "fast_reverse_start" / "fast_reverse_end" / "fast_forward_start" / "fast_forward_end"
   * @description For controlling playback status
   * @returns {Promise}
   * @public
   */
  setPlayback(playback) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setPlayback', { params: { playback } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setPlayPosition  
   * @param {number} position - Specifies play position (sec). Value : no fewer than total_time gotten via getPlayInfo, nor more than 0
   * @description For setting track play position. This API is available only when input is Server.
   * @returns {Promise}
   * @public
   */
  setPlayPosition(position) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setPlayPosition', { params: { position } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method toggleRepeat
   * @description For toggling repeat setting. No direct / discrete setting commands available
   * @returns {Promise}
   * @public
   */
  toggleRepeat() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/toggleRepeat')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method toggleShuffle
   * @description For toggling shuffle setting. No direct / discrete setting commands available
   * @returns {Promise}
   * @public
   */
  toggleShuffle() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/toggleShuffle')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getListInfo
   * @param {string} list_id - Specifies list ID. If nothing specified, "main" is chosen implicitly. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {string} input Specifies target Input ID. Controls for setListControl are to work with the input specified here. Values: Input IDs for Net/USB related sources
   * @param {number} index - Specifies the reference index (offset from the beginning of the list). Note that this index must be in multiple of 8. If nothing was specified, the reference index previously specified would be used. Values: 0, 8, 16, 24, ..., 64984, 64992
   * @param {number} size - Specifies max list size retrieved at a time.
   * @param {string} lang - Specifies list language. But menu names or text info are not always necessarily pulled in a language specified here. If nothing specified, English ("en") is used implicitly. Values: "en" (English)/ "ja" (Japanese)/ "fr" (French)/ "de" (German)/ "es" (Spanish)/ "ru" (Russian)/ "it" (Italy)/ "zh" (Chinese)
   */
  getListInfo(list_id, input, index, size, lang) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getListInfo', { params: { list_id, input, index, size, lang } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setListControl
   * @param {string} list_id - Specifies list ID. If nothing specified, "main" is chosen implicitly. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {string} type - Specifies list transition type. "select" is to enter and get into one deeper layer than the current layer where the element specified by the index belongs to. "play" is to start playback current index element, "return" is to go back one upper layer than current. "select" and "play" needs to specify an index at the same time. In case to “select” an element with its attribute being "Capable of Search", specify search text using setSearchString in advance. (Or it is possible to specify search text and move layers at the same time by specifying an index in setSearchString). Values: "select" / "play" / "return".
   * @param {number} index - Specifies an element position in the list being selected (offset from the beginning of the list). This is mandatory to specify if the type is "select" or "play". Value Range: 0 - 64999
   * @param {string} zone - Specifies target zone ID. If nothing specified, "main" is chosen implicitly. Values: "main" / "zone2" / "zone3" / "zone4"
   */
  setListControl(list_id, type, index, zone) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setListControl', { params: { list_id, type, index, zone } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
  
  /**
   * @method setSearchString
   * @description For setting search string. This is to specify search text for "Capable of Search" element. This is also to specify search text and move layers at the same time by specifying an index in setSearchString. If nothing specified, "main" is chosen implicitly. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {string} list_id - Specifies list ID. If nothing specified, "main" is chosen implicitly. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {string} string - Specifies search text. Values: Any text string
   * @param {number} index - Specifies an element position in the list being selected (offset from the beginning of the list). This is mandatory to specify if the type is "select" or "play". Value Range: 0 - 64999
   * @returns {Promise}
   * @public
   */
  setSearchString(list_id, string, index) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setSearchString', { params: { list_id, string, index } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method recallPreset
   * @description For recalling a preset. This is to recall a preset registered by setStorePreset. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {string} zone - Specifies target zone ID. If nothing specified, "main" is chosen implicitly. Values: "main" / "zone2" / "zone3" / "zone4"
   * @param {number} num - Specifies preset number. Value Range: 1 - 40
   * @returns {Promise}
   * @public
   */
  recallPreset(zone, num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/recallPreset', { params: { zone, num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method storePreset
   * @description For storing a preset. This is to store a preset. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {number} num - Specifies preset number. Value Range: 1 - 40
   * @returns {Promise}
   * @public
   */
  storePreset(num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/storePreset', { params: { num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method clearPreset
   * @description For clearing a preset. This is to clear a preset registered by setStorePreset. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {number} num - Specifies preset number. Value Range: 1 - 40
   * @returns {Promise}
   * @public
   */
  clearPreset(num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/clearPreset', { params: { num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method movePreset
   * @description For moving a preset. This is to move a preset registered by setStorePreset. Values: "main" (common for all Net/USB sources), "auto_complete" (Pandora), "search_artist" (Pandora), "search_track" (Pandora)
   * @param {number} from - Specifies preset number. Value Range: 1 - 40
   * @param {number} to - Specifies preset number. Value Range: 1 - 40
   * @returns {Promise}
   * @public
   */
  movePreset(from, to) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/movePreset', { params: { from, to } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getSettings
   * @description For retrieving setup of Net/USB.
   * @returns {Promise}
   * @public
   */
  getSettings() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getSettings')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setQuality
   * @description For setting up quality of Net/USB.
   * @param {string} input - Specifies target Input ID. Values: "qobuz".
   * @param {string} value - Specifies reproduction quality. Refer to available value in each input via /getSettings. Values: "hr_192_24" / "hr_96_24" / "cd_44_16" / "mp3_320"
   * @returns {Promise}
   * @public
   */
  setQuality(input = 'qobuz', value) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setQuality', { params: { input, value } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getRecentInfo
   * @description For retrieving playback history. History is shared among all Net/USB Input sources.
   * @returns {Promise}
   * @public
   */
  getRecentInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getRecentInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method recallRecentItem
   * @description For recalling a content via playback history.
   * @param {string} zone - Specifies target Zone ID. Values: "main", "zone2", "zone3", "zone4"
   * @param {number} num - Specifies preset number. Value Range: 1 - 40
   * @returns {Promise}
   * @public
   */
  recallRecentItem(zone, num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/recallRecentItem', { params: { zone, num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method clearRecentInfo
   * @description For clearing all recent history informaiton.
   * @returns {Promise}
   * @public
   */
  clearRecentInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/clearRecentInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method managePlay
   * @description For controlling playback of Net/USB.
   * @param {string} type - Specifies type of special processing. Value: "add_bookmark" (Net Radio), "add_track" (Rhapsody / Napster / Pandora / JUKE / Qobuz), "add_album" (Rhapsody / Napster / JUKE), "add_channel_track" (Pandora), "add_channel_artist" (Pandora), "add_playlist" (Qobuz), "thumbs_up" (Pandora), "thumbs_down" (Pandora), "mark_tired" (Pandora)
   * @param {number} timeout - Specifies timeout duration(ms) for this API process. If specifies 0, treat as maximum vale. Value: 0 ～ 60000
   * @returns {Promise}
   * @public
   */
  managePlay(type, timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/managePlay', { params: { type, timeout } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method manageList
   * @description For controlling playback of Net/USB.
   * @param {string} list_id - Specifies type of special processing. Value: "add_bookmark" (Net Radio), "add_track" (Rhapsody / Napster / JUKE / Qobuz), "add_album" (Rhapsody / Napster / JUKE / Qobuz), "add_artist" (Qobuz), "add_channel" (Rhasody / Napster / Pandora), "add_playlist" (Qobuz), "remove_bookmark" (Net Radio), "remove_track" (Rhapsody / Napster / JUKE / Qobuz), "remove_album" (Rhapsody / Napster / JUKE / Qobuz), "remove_artist" (Qobuz), "remove_channel" (Rhapsody / Napster / Pandora), "remove_playlist" (Rhapsody / Napster / Qobuz), "end_auto_complete" (Pandora), "end_auto_complete" must be excuted when make a Auto Complete window (Pandora) disappear. (certification requirement)
   * @param {string} type - Specifies type of special processing. Value: "play", "play_next", "play_previous", "select_track", "select_album", "select_playlist", "select_channel", "select_preset"
   * @param {number} index - Specifies the reference index (offset from the beginning of the list). No parameter set if type is "end_auto_complete". Vaule: 0 ~ 64999
   * @param {string} zone - Specifies target Zone ID. Values: "main", "zone2", "zone3", "zone4"
   * @param {number} timeout - Specifies timeout duration(ms) for this API process. If specifies 0, treat as maximum vale. Value: 0 ～ 60000
   */
  manageList(list_id, type, index, zone, timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/manageList', { params: { list_id, type, index, zone, timeout } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getPlayDescription
   * @description For retrieving track’s detail information.
   * @param {string} type - Specifies type of information to retrieve. Value: "why_this_song", "why_this_album", "why_this_artist", "why_this_playlist", "why_this_channel"
   * @param {number} timeout - Specifies timeout duration(ms) for this API process. If specifies 0, treat as maximum vale. Value: 0 ～ 60000
   * @returns {Promise}
   * @public
   */
  getPlayDescription(type = 'why_this_song', timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getPlayDescription', { params: { type, timeout } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setListSortOption
   * @description For setting List sorting method. Retrieve List information via /getListInfo after setting
   * @param {string} input - Specifies target Input ID. Controls for setListControl are to work with the input specified here. Value : "pandora"
   * @param {string} type - Specifies type of sorting. Value: "date", "alphabet", "new", "old", "track", "album", "artist", "genre", "none"
   */
  setListSortOption(input = 'pandora', type = 'date') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setListSortOption', { params: { input, type } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getAccountStatus
   * @description For retrieving account information registered on Device.
   * @returns {Promise}
   * @public
   */
  getAccountStatus() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getAccountStatus')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method switchAccount
   * @description For switching account for service corresponding multi account.
   * @param {string} input - Specifies target Input ID. Controls for setListControl are to work with the input specified here. Value : "pandora"
   * @param {number} index - Specifies switch account index. Value : 0 ~ 7 (Pandora)
   * @param {number} timeout - Specifies timeout duration(ms) for this API process. If specifies 0, treat as maximum vale. Value: 0 ～ 60000
   * @returns {Promise}
   * @public
   */
  switchAccount(input, index, timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/switchAccount', { params: { input, index, timeout } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method getServiceInfo
   * @description For retrieving service information.
   * @param {string} input - Specifies target Input ID. Value: "pandora" / "rhapsody" / "napster"
   * @param {string} type - Specifies type of retrieving info. Value: "account_list" (Pandora), "licensing" (Rhapsody / Napster / Pandora), "activation_code" (Pandora)
   * @param {number} timeout - Specifies timeout duration(ms) for this API process. If specifies 0, treat as maximum vale. Value: 0 ～ 60000
   * @returns {Promise}
   * @public
   */
  getServiceInfo(input, type, timeout = 5000) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getServiceInfo', { params: { input, type, timeout } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res)
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}

/**
 * @class YamahaMusicCastCD
 * @description Yamaha MusicCast CD Class.
 * @version 1.0.0
 * @exports YamahaMusicCastCD
 * @requires axios
 */
class YamahaMusicCastCD {
  #ip;
  #eventPort;
  #axiosInstance;

  /**
   * @method constructor
   * @param {string} ip
   * @param {number} eventPort
   * @description Creates an instance of YamahaMusicCastCD.
   * @version 1.0.0 
   */
  constructor(ip, eventPort) {
    this.setup(ip, eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCastCD instance.
   * @version 1.0.0
   * @private 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port (UDP - default 41100)
    this.#eventPort = eventPort;
    // Create an axios instance
    this.#axiosInstance = axios.create({
      baseURL: `http://${this.#ip}:80/YamahaExtendedControl/v1/cd`,
      timeout: 15 * 1000,
      headers: {
        'X-AppName': 'ERDesigns/1.0',
        'X-AppPort': this.#eventPort,
      },
    });
  }

  /**
   * @method getPlayInfo
   * @description For retrieving playback information.
   * @returns {Promise}
   * @public
   */
  getPlayInfo() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getPlayInfo')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setPlayback
   * @description For setting playback.
   * @param {string} playback - Specifies playback. Values: "play" / "stop" / "pause" / "previous" / "next" / "fast_reverse_start" / "fast_reverse_end" / "fast_forward_start" / "fast_forward_end" / "track_select "
   * @param {number} num - Specifies track number. Value: 1 ~ 512
   * @returns {Promise}
   * @public
   */
  setPlayback(playback, num) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setPlayback', { params: { playback, num } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method toggleTray
   * @description For toggling CD tray Open/Close setting.
   * @returns {Promise}
   * @public
   */
  toggleTray() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/toggleTray')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method toggleRepeat
   * @description For toggling repeat setting. No direct / discrete setting commands available.
   * @returns {Promise}
   * @public
   */
  toggleRepeat() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/toggleRepeat')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method toggleShuffle
   * @description For toggling shuffle setting. No direct / discrete setting commands available.
   * @returns {Promise}
   * @public
   */
  toggleShuffle() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/toggleShuffle')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}

/**
 * @class YamahaMusicCastClock
 * @description Yamaha MusicCast Clock Class.
 * @version 1.0.0
 * @exports YamahaMusicCastClock
 * @requires axios
 */
class YamahaMusicCastClock {
  #ip;
  #eventPort;
  #axiosInstance;

  /**
   * @method constructor
   * @param {string} ip
   * @param {number} eventPort
   * @description Creates an instance of YamahaMusicCastClock.
   * @version 1.0.0 
   */
  constructor(ip, eventPort) {
    this.setup(ip, eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCastClock instance.
   * @version 1.0.0
   * @private 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port (UDP - default 41100)
    this.#eventPort = eventPort;
    // Create an axios instance
    this.#axiosInstance = axios.create({
      baseURL: `http://${this.#ip}:80/YamahaExtendedControl/v1/clock`,
      timeout: 15 * 1000,
      headers: {
        'X-AppName': 'ERDesigns/1.0',
        'X-AppPort': this.#eventPort,
      },
    });
  }

  /**
   * @method getSettings
   * @description For retrieving setting related to Clock function.
   * @returns {Promise}
   * @public
   */
  getSettings() {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/getSettings')
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setSettings
   * @description For setting clock time auto sync. Available only when "date_and_time" exists in clock - func_list under /system/getFeatures.
   * @param {boolean} clockMode - Specifies whether or not clock auto sync is valid.
   * @returns {Promise}
   * @public
   */
  setAutoSync(enable) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setAutoSync', { params: { enable } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setDateAndTime
   * @description For setting date and clock time. Available only when "date_and_time" exists in clock - func_list under /system/getFeatures.
   * @param {string} date_time - Specifies date and time set on device. Format is "YYMMDDhhmmss".
   * @returns {Promise}
   * @public
   */
  setDateAndTime(date_time) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setDateAndTime', { params: { date_time } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setClockFormat
   * @description For setting clock format. Available only when "clock_format" exists in clock - func_list under /system/getFeatures.
   * @param {string} format - Specifies clock format. "12h" or "24h".
   * @returns {Promise}
   * @public
   */
  setClockFormat(format = '24h') {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .get('/setClockFormat', { params: { format } })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

  /**
   * @method setAlarmSettings
   * @description For setting aram function.
   * @param {boolean} alarm_on - Specifies alarm function status on/off.
   * @param {number} volume - pecifies alarm volume value. Vaule Range : calculated by minimum/maximum/step value gotten via /system/getFeatures "alarm_volume"
   * @param {number} fade_interval - Specifies fade interval value. Vaule Range : calculated by minimum/maximum/step value gotten via /system/getFeatures "alarm_fade_interval"
   * @param {string} fade_type - Specifies alarm fade type. Value : 1 ~ fade_type_max ( value gotten via /system/getFeatures)
   * @param {string} mode - Specifies alarm mode. Value : one gotten via /system/getFeatures "alarm_mode_list"
   * @param {string} repeat - Specifies repeat setting.This parameter is valid only when alarm mode "oneday" is specified
   * @param {object} detail - Setting detail information of alarm function
   * @param {string} detail.day - Specifies target date for alarm setting. This parameter is specified certainly when set detail parameters. Value : "oneday" / "sunday" / "monday" / "tuesday" / "wednesday " / "thursday" / "friday" / "saturday"
   * @param {boolean} detail.enable - Specifies whether or not alarm function is valid.
   * @param {string} detail.time - Specifies alarm time. Format is "hhmm".
   * @param {boolean} detail.beep - Specifies whether or not beep sound is valid.
   * @param {string} detail.playback_type - Specifies playback type. Value : "resume" / "preset"
   * @param {object} detail.resume - Specifies resume playback setting. This parameter is valid only when playback type "resume" is specified.
   * @param {string} detail.resume.input - Specifies target Input ID to playback. No playback when "none" is specified. Values: Input IDs gotten via /system/getFeatures "alarm_input_list"
   * @param {object} detail.preset - Specifies detail infomarion when preset is specified. This parameter is valid only when playback_type "preset" is specified
   * @param {string} detail.preset.type - Specifies preset type. Values : Type gotten via /system/getFeatures "alarm_preset_list"
   * @param {number} detail.preset.num - Specifies preset number. Selectable preset number in each preset type is readable in /system/getFeatures.

   */
  setAlarmSettings(alarm_on, volume, fade_interval, fade_type, mode, repeat, detail = {
    day: 'oneday',
    enable: false,
    time: '0000',
    beep: false,
    playback_type: 'resume',
    resume: {
      input: 'none',
    },
    preset: {
      type: 'none',
      num: 1,
    }
  }) {
    return new Promise((resolve, reject) => {
      this.#axiosInstance
        .post('/setAlarmSettings', { alarm_on, volume, fade_interval, fade_type, mode, repeat, detail })
        .then((response) => {
          const res = response.data;
          if (res.response_code === 0) {
            resolve(res);
          } else {
            reject(res);
          }
        })
        .catch((error) => {
          reject(error);
        });
    });
  }

}

/**
 * @class YamahaMusicCast
 * @description YamahaMusicCast class.
 * @version 1.0.0
 * @exports YamahaMusicCast
 * @requires axios
 * @requires electron/ipcMain
 * @see {@link https://forum.smartapfel.de/attachment/4358-yamaha-musiccast-http-simplified-api-for-controlsystems-pdf/}
 * @see {@link https://github.com/samvdb/php-musiccast-api/blob/23585ca3077ed90307b292fc15d297f4da0cd1bb/YXC_API_Spec_Basic.pdf}
 */
class YamahaMusicCast extends EventEmitter {
  #ipcMain;
  #ip;
  #eventPort;
  #server;
  #system;
  #zone;
  #tuner;
  #netusb;
  #cd;
  #clock;


  /**
   * @constructor YamahaMusicCast
   * @description Creates an instance of YamahaMusicCast.
   * @returns {YamahaMusicCast}
   * @version 1.0.0 
   */
  constructor(ipAddress, eventPort = 50001) {
    this.setup(ipAddress, eventPort);
  }

  /**
   * @method setupEventReceiver
   * @param {number} eventPort
   * @description Sets up the event receiver. This is used to receive events from the Yamaha receiver (e.g. volume change).
   * @returns {void}
   */
  setupEventReceiver(eventPort) {
    if (this.#server) {
      this.#server.close();
      this.#server = null;
    }

    // Create a UDP server
    this.#server = dgram.createSocket('udp4');

    // Listen for error events
    this.#server.on('error', (error) => {
      this.emit('error', error);
      this.#server.close();
    });

    // Listen for message events
    this.#server.on('message', (msg, rinfo) => {
      const json = JSON.parse(msg.toString());
      this.emit('message', rinfo, json);
    });

    // Listen for listening events
    this.#server.on('listening', () => {
      const address = this.#server.address();
      this.emit('listening', address);
    });

    // Bind the server to the event port
    this.#server.bind(eventPort);
  }

  /**
   * @method setup
   * @param {string} ip
   * @param {number} eventPort
   * @description Sets up the YamahaMusicCast instance.
   * @returns {void} 
   */
  setup(ip, eventPort) {
    // Set the Yamaha receiver IP address
    this.#ip = ip;
    // Set the Yamaha receiver event port
    this.#eventPort = eventPort;
    // Set-up the event receiver
    this.setupEventReceiver(eventPort);
    // Create a new YamahaMusicCastSystem instance
    this.#system = new YamahaMusicCastSystem(this.#ip, this.#eventPort);
    // Create a new YamahaMusicCastZone instance
    this.#zone = new YamahaMusicCastZone(this.#ip, this.#eventPort);
    // Create a new YamahaMusicCastTuner instance
    this.#tuner = new YamahaMusicCastTuner(this.#ip, this.#eventPort);
    // Create a new YamahaMusicCastNetworkUSB instance
    this.#netusb = new YamahaMusicCastNetworkUSB(this.#ip, this.#eventPort);
    // Create a new YamahaMusicCastCD instance
    this.#cd = new YamahaMusicCastCD(this.#ip, this.#eventPort);
    // Create a new YamahaMusicCastClock instance
    this.#clock = new YamahaMusicCastClock(this.#ip, this.#eventPort);
  }

  /**
   * @getter ip
   * @description Gets the Yamaha receiver IP address.
   * @returns {string}
   */
  get ip() {
    return this.#ip;
  }

  /**
   * @setter ip
   * @param {string} ip
   * @description Sets the Yamaha receiver IP address.
   * @returns {void}
   */
  set ip(ip) {
    this.#ip = ip;
  }

  /**
   * @getter eventPort
   * @description Gets the Yamaha receiver event port.
   * @returns {number}
   */
  get eventPort() {
    return this.#eventPort;
  }

  /**
   * @setter eventPort
   * @param {number} eventPort
   * @description Sets the Yamaha receiver event port.
   * @returns {void}
   */
  set eventPort(eventPort) {
    this.#eventPort = eventPort;
  }
  
  /**
   * @getter system
   * @description Gets the YamahaMusicCastSystem instance.
   * @returns {YamahaMusicCastSystem}
   */
  get system() {
    return this.#system;
  }

  /**
   * @getter zone
   * @description Gets the YamahaMusicCastZone instance.
   * @returns {YamahaMusicCastZone}
   */
  get zone() {
    return this.#zone;
  }

  /**
   * @getter tuner
   * @description Gets the YamahaMusicCastTuner instance.
   * @returns {YamahaMusicCastTuner}
   */
  get tuner() {
    return this.#tuner;
  }

  /**
   * @getter netusb
   * @description Gets the YamahaMusicCastNetworkUSB instance.
   * @returns {YamahaMusicCastNetworkUSB}
   */
  get netusb() {
    return this.#netusb;
  }

  /**
   * @getter cd
   * @description Gets the YamahaMusicCastCD instance.
   * @returns {YamahaMusicCastCD}
   */
  get cd() {
    return this.#cd;
  }

  /**
   * @getter clock
   * @description Gets the YamahaMusicCastClock instance.
   * @returns {YamahaMusicCastClock}
   */
  get clock() {
    return this.#clock;
  }

}

// Export the YamahaMusicCast class
module.exports = YamahaMusicCast;
