const slugify = require('slugify');

module.exports = {
  lifecycles: {
    beforeCreate: async (data) => {
      if (data.title) {
        data.slug = slugify(data.title);
      }
    },
    beforeUpdate: async (params, data) => {
      data.slug = slugify(data.title);
    },
  },
};
