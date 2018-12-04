var portId;
var portView;
var portName;
var devField;
var devLang;
var speField;
var userId;

module.exports.setPortId = function(port_id) {
    portId = port_id;
};

module.exports.getPortId = function() {
    return portId;
};

module.exports.setPortView = function(port_view) {
    portView = port_view;
};

module.exports.getPortView = function() {
    return portView;
};

module.exports.setPortName = function(port_name) {
    portName = port_name;
};

module.exports.getPortName = function() {
    return portName;
};

module.exports.setDevField = function(dev_field) {
    devField = dev_field;
};

module.exports.getDevField = function() {
    return devField;
}

module.exports.setDevLang = function(dev_lang) {
    devLang = dev_lang;
};

module.exports.getDevLang = function() {
    return devLang;
};

module.exports.setSpeField = function(spe_field) {
    speField = spe_field;
};

module.exports.getSpeField = function() {
    return speField;
};

module.exports.setUserId = function(user_id) {
    userId = user_id;
};

module.exports.getUserId = function() {
    return userId;
};