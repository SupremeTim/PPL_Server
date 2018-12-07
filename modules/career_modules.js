var careerDetail;

module.exports.setCareerDetail = function(name, term, comment){
    careerDetail = [name, term, comment];
};

module.exports.getCareerDetail = function(){
    return careerDetail;
};