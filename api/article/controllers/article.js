const { sanitizeEntity } = require('strapi-utils');

module.exports = {

  async find(ctx) {
    let entities;

    ctx.query = {
      ...ctx.query,
      status: 'published'
    }
    if(ctx.query._q) {
      entities = await strapi.services.article.search(ctx.query);
    } else {
      entities = await strapi.services.article.find(ctx.query);
    }

    return entities.map(entity => sanitizeEntity(entity, { model: strapi.models.article }));
  },

  async comment(ctx) {
    let entity;
    if (ctx.is('multipart')) {
      const { data, files } = parseMultipartData(ctx);
      entity = await strapi.services.comment.create(data, { files });
    } else {
      //ctx.request.body.author = ;
      ctx.request.body.article = ctx.params.id;
      entity = await strapi.services.comment.create(ctx.request.body);
    }
    return sanitizeEntity(entity, { model: strapi.models.comment });
  }
}; 