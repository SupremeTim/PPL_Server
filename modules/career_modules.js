var careerDetail;

module.exports.setCareerDetail = function(name, term, comment){
    careerDetail = [name, term, comment];
};

module.exports.getCareerDetail = function(){
    return careerDetail;
};

module.exports.getCareerName = function(){
    return careerDetail[0];
};

module.exports.getCareerTerm = function(){
    return careerDetail[1];
};

module.exports.getCareerComment = function(){
    return careerDetail[2];
};