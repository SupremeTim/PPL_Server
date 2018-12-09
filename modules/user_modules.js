var userCareer;
var templateNum;

module.exports.setUserCareer = function(career) {
    userCareer = career;
};

module.exports.getUserCareer = function() {
    return userCareer;
};

module.exports.setTemplateNum = function(num) {
    templateNum = num;
};

module.exports.getTemplateNum = function() {
    return templateNum;
};