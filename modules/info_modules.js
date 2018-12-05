var openAge;
var introComment;
var profileImage;
var portId;

module.exports.setOpenAge = function(open_age) {
    openAge = open_age;
};

module.exports.getOpenAge = function() {
    return openAge;
};

module.exports.setIntroComment = function(intro_comment) {
    introComment = intro_comment;
};

module.exports.getIntroComment = function() {
    return introComment;
};

module.exports.setPortId = function(port_id) {
    portId = port_id;
};

module.exports.getPortId = function() {
    return portId;
};

module.exports.setProfileImage = function(image) {
    profileImage = image;
};

module.exports.getProfileImage = function() {
    return profileImage;
};