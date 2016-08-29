/**
 * @copyright Maichong Software Ltd. 2016 http://maichong.it
 * @date 2016-08-29
 * @author Liang <liang@maichong.it>
 */

'use strict';

var sdk = {
  isReady: false,
  config: function (config) {
    sdk.isReady = false;
    wx.config(config);
    return sdk.ready();
  },
  ready: function () {
    if (sdk.isReady) return Promise.resolve(wx);
    return new Promise(function (resolve, reject) {
      wx.error(reject);
      wx.ready(function () {
        sdk.isReady = true;
        resolve(wx);
      });
    });
  }
};

[
  'checkJsApi',
  'onMenuShareTimeline',
  'onMenuShareAppMessage',
  'onMenuShareQQ',
  'onMenuShareWeibo',
  'onMenuShareQZone',
  'startRecord',
  'stopRecord',
  'onVoiceRecordEnd',
  'playVoice',
  'pauseVoice',
  'stopVoice',
  'onVoicePlayEnd',
  'uploadVoice',
  'downloadVoice',
  'translateVoice',
  'chooseImage',
  'previewImage',
  'uploadImage',
  'downloadImage',
  'getNetworkType',
  'openLocation',
  'getLocation',
  'hideOptionMenu',
  'showOptionMenu',
  'closeWindow',
  'hideMenuItems',
  'showMenuItems',
  'hideAllNonBaseMenuItem',
  'showAllNonBaseMenuItem',
  'scanQRCode',
  'openProductSpecificView',
  'addCard',
  'chooseCard',
  'openCard',
  'chooseWXPay'
].forEach(function (api) {
  sdk[api] = function (params) {
    params = params || {};
    return new Promise(function (resolve, reject) {
      params.success = resolve;
      params.fail = reject;
      params.cancel = reject;
      sdk.ready().then(function (wx) {
        wx[api](params);
      });
    });
  }
});

module.exports = sdk.default = sdk;
