var userStory = new Array();

module.exports.setStory = function(name, info, link, url) {
    var storyObject = { name, info, link, url};
    userStory.push(storyObject);
};

module.exports.getStory = function() {
    return userStory.pop();
};

module.exports.spliceStory = function(index) {
    userStory.splice(index, 1);
};

module.exports.getAllStory = function() {
    return userStory;
};