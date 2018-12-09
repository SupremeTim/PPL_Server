var userStory;

module.exports.setStory = function(name, info, link, url) {
    userStory = [name, info, link, url];
};

module.exports.getStory = function() {
    return userStory;
};

module.exports.getStoryName = function(){
    return userStory[0];
};

module.exports.getStoryInfo = function(){
    return userStory[1];
};

module.exports.getStoryLink = function(){
    return userStory[2];
};

module.exports.getStoryUrl = function(){
    return userStory[3];
};