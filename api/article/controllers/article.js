const { parseMultipartData, sanitizeEntity } = require('strapi-utils');

module.exports = {
  /**
   * Create a record.
   *
   * @return {Object}
   */

  async create(ctx) {
    let entity;
    if (ctx.is('multipart')) {
        const { data, files } = parseMultipartData(ctx);
        data.author = ctx.state.user.username;
        entity = await strapi.services.article.create(data, { files });
    } else {
        ctx.request.body.owner = ctx.state.user;
        ctx.request.body.author = ctx.state.user.username;
        entity = await strapi.services.article.create(ctx.request.body);
    }
        return sanitizeEntity(entity, { model: strapi.models.article });
  },
};