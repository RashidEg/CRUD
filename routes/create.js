module.exports = (app, db) => {
  app.post('/order', {
    schema: {
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', pattern: '\\S' }
        },
        additionalProperties: false
      },
      response: {
        201: {
          type: 'object',
          properties: {
            message: { type: 'string' },
            order: {
              type: 'object',
              properties: {
                id: { type: 'string' },
                name: { type: 'string' },
                date: { type: 'string' }
              }
            }
          }
        }
      }
    }
  }, async (request, reply) => {
    let Order = require('../schema').Order;
    
    const order = await Order.create({ name: request.body.name });

    return reply.code(201).send({
      message: 'Order created successfully',
      order: order.toJSON()
    });
  });
};