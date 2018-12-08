var userStory;

module.exports.setStory = function(name, info, link, url) {
    userStory = [name, info, link, url];
};

module.exports.getStory = function() {
    return userStory;
};
