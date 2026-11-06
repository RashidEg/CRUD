module.exports = (app, db) => {
  app.delete('/order/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
        }
      },
      response: {
        200: {
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

    const order = await Order.findByIdAndDelete(request.params.id);
    if (!order) {
      return reply.code(404).send({ error: 'Order not found' });
    }

    return reply.code(200).send({
      message: 'Order deleted successfully',
      order: order.toJSON()
    });
  });
};