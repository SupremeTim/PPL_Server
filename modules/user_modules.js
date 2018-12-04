var userCareer;

module.exports.setUserCareer = function(career) {
    userCareer = career;
};

module.exports.getUserCareer = function() {
    return userCareer;
};