const Sequelize = require('sequelize');
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database, config.username, config.password, config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// 모델 데이터베이스에 연결
db.User = require('./user')(sequelize, Sequelize); // 사용자
db.Info = require('./info')(sequelize, Sequelize); // 사용자가 포트폴리오 작성 시 입력하는 정보
db.Project_Experience = require('./project_experience')(sequelize, Sequelize); // 포트폴리오 작성 시 입력하는 프로젝트 경험
db.Portfolio = require('./portfolio')(sequelize, Sequelize); // 포트폴리오
db.Template = require('./template')(sequelize, Sequelize); // 포트폴리오를 구성하는 템플릿
db.Category_Header = require('./category_header')(sequelize, Sequelize); // 카테고리 조회를 쉽게 하기 위한 묶음
db.Dev_Field = require('./dev_field')(sequelize, Sequelize); // 카테고리 - 개발 분야
db.Spe_Field = require('./spe_field')(sequelize, Sequelize); // 카테고리 - 전문 분야
db.Dev_Lang = require('./dev_lang')(sequelize, Sequelize); // 카테고리 - 개발 언어

// 테이블 별 관계 설정
// user 1 : N portfolio - 사용자 한명 당 여러개의 포트폴리오를 가질 수 있다
db.User.hasMany(db.Portfolio, { foreignKey: 'user_id', sourceKey: 'id' });
db.Portfolio.belongsTo(db.User, {foreignKey: 'user_id', targetKey: 'id'});

// portfolio 1 : 1 info - 포트폴리오 하나 당 입력하는 회원 정보는 하나다
db.Portfolio.hasOne(db.Info, {foreignKey: 'port_id', sourceKey: 'id'});
db.Info.belongsTo(db.User, {foreignKey: 'port_id', targetKey: 'id'});

// info 1 : 1 pro_ex - 포트폴리오 하나 당 프로젝트 경험 하나를 입력받으므로 입력 정보와 경험의 관계는 1:1
db.Info.hasOne(db.Project_Experience, {foreignKey: 'info_id', sourceKey: 'id'});
db.Project_Experience.belongsTo(db.Info, {foreignKey: 'info_id', targetKey: 'id'});

// portfolio 1 : 1 template - 포트폴리오는 하나의 템플릿으로 구성되므로 1:1
db.Info.hasOne(db.Template, {foreignKey: 'port_id', sourceKey: 'id'});
db.Template.belongsTo(db.Info, {foreignKey: 'port_id', targetKey: 'id'});

// portfolio 1 : 1 category_header - 포트폴리오 하나는 카테고리 묶음 하나를 갖는다
db.Portfolio.hasOne(db.Category_Header, {foreignKey: 'port_id', sourceKey: 'id'});
db.Category_Header.belongsTo(db.Portfolio, {foreignKey: 'port_id', targetKey: 'id'});

// category_header 1 : 1 dev_field, spe_field, dev_lang - 카테고리 묶음은 개발 분야, 전문 분야, 개발 언어를 하나씩 갖는다
db.Category_Header.hasOne(db.Dev_Field, {foreignKey: 'category_id', sourceKey: 'id'});
db.Dev_Field.belongsTo(db.Category_Header, {foreignKey: 'category_id', targetKey: 'id'});
db.Category_Header.hasOne(db.Spe_Field, {foreignKey: 'category_id', sourceKey: 'id'});
db.Spe_Field.belongsTo(db.Category_Header, {foreignKey: 'category_id', targetKey: 'id'});
db.Category_Header.hasOne(db.Dev_Lang, {foreignKey: 'category_id', sourceKey: 'id'});
db.Dev_Lang.belongsTo(db.Category_Header, {foreignKey: 'category_id', targetKey: 'id'});

module.exports = db;