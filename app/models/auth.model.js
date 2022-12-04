module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING
    },
    name: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
    },
    gender:{
      type: Sequelize.STRING
    },
    is_admin:{
      type:Sequelize.BOOLEAN,
      defaultValue:false
    }
  });

  return User;
};
