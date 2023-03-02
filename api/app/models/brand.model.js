module.exports = (sequelize, Sequelize) => {
  const Brand = sequelize.define("brand", {
    termShort: {
      type: Sequelize.STRING
    },
    termLong: {
      type: Sequelize.STRING
    },
    hits: {
      type: Sequelize.INTEGER
    },
    type: {
      type: Sequelize.STRING
    }
  });

  return Brand;
};