module.exports = (sequelize, DataTypes) => {

    const Tweets = sequelize.define("Tweets", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        text: {
            allowNull: false,
            type: DataTypes.TEXT,
        },
        userId: {
            allowNull: false,
            type: DataTypes.INTEGER,
        },
    }, {
        charset: "utf8", // 한국어 설정
        collate: "utf8_general_ci", // 한국어 설정
        tableName: "TWeets", // 테이블 이름 정의
        timestamps: true, // createAt, updateAt 활성화
        paranoid: true, // deleteAt 옵션
    });

    return Tweets;
};