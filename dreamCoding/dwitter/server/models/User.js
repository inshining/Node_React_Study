module.exports = (sequelize, DataTypes) => {

    const Users = sequelize.define("Users", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        username:{
            type:DataTypes.STRING,
            allowNull: false,
            unique:true,
        },
        password:{
            type:DataTypes.STRING,
            allowNull: false,
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        name: {
            type:DataTypes.STRING,
            allowNull:false,
        },
        url: {
            type:DataTypes.STRING,
        }}, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "Users", // 테이블 이름 정의
        timestamps: true, // createAt, updateAt 활성화
        paranoid: true, // deleteAt 옵션
    });

    return Users;
};