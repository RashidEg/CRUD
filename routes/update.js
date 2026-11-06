module.exports = (app, db) => {
  app.put('/order/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
        }
      },
      body: {
        type: 'object',
        required: ['name'],
        properties: {
          name: { type: 'string', pattern: '\\S' }
        },
        additionalProperties: false
      }
    }
  }, async (request, reply) => {
    let Order = require('../schema').Order;

    const order = await Order.findByIdAndUpdate(
      request.params.id,
      { name: request.body.name },
      { new: true }
    );

    if (!order) {
      return reply.code(404).send({ error: 'Order not found' });
    }

    return reply.code(204).send();
  });
};