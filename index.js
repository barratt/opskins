var request = require('request');
var events = require('events');

var userAPI = "https://opskins.com/api/user_api.php"

function isOkay(err, res) {
  if(err) {
    return true;
  }

  if(res.statusCode != 200) {
    return false;
  } else {
    return true;
  }
}

var OPSkins = function(apiKey) {
  this.apiKey  = apiKey;
  this.emitter =  new events.EventEmitter();

  var self = this;

  self._request("test", function(err, data) {
    if (!err && data.success != 200) {
      self.emitter.emit("ready");
    } else {
      self.emitter.emit("apikeyError", err)
    }
  })
}

OPSkins.prototype._request = function(action, data, callback) {

  if (callback != null) {
    callback = data // Optional data.
  }

  var url = userAPI + "?key=" + this.apiKey + "&request=" + action;
  var keys = Object.keys(data);

  for (var i = keys.length - 1; i >= 0; i--) {
    url += "&" + keys[i] + "=" + data[keys[i]];
  }

  request(url, function(err, res, body) {
    if (!isOkay(err, res)) {
      return callback(err || new Error("Unknown error occured")); // Should probably improve this.
    }
    try {
      var data = JSON.parse(body);
      return callback(null, data);
    } catch(Exception) {
      return callback(new Error("Unable to parse reponse"));
    }
  });
}

OPSkins.prototype.on = function(event, callback) {
  this.emitter.on(event, callback);
}

OPSkins.prototype.sellItem = function(assetid, amount, feature, callback) {
  // feature and callback are optional.

  if (feature != null) {
    callback = function() {}
  }

  if (callback != null) {
    callback = feature
  }

  this._request("SellItem", { assetid: assetid, amount: amount, featured: feature }, function(err, data) {
    return callback(err, data.bot, data.bot_steamid, data.token, data.sale_id, data.tradeoffer_id);
  });
}

module.exports = OPSkins
