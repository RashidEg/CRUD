const orderResponseSchema = {
  type: 'object',
  properties: {
    id: { type: 'string' },
    name: { type: 'string' },
    date: { type: 'string' }
  }
};

const idParamsSchema = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', pattern: '^[0-9a-fA-F]{24}$' }
  }
};

module.exports = (app, db) => {
  // GET /orders
  app.get('/orders', {
    schema: {
      response: {
        200: {
          type: 'object',
          properties: {
            count: { type: 'number' },
            orders: { type: 'array', items: orderResponseSchema }
          }
        }
      }
    }
  }, async (request, reply) => {
    let Order = require('../schema').Order;

    const orders = await Order.find().sort({ date: -1 });

    return reply.code(200).send({
      count: orders.length,
      orders: orders.map(o => o.toJSON())
    });
  });

  // GET /order/:id
  app.get('/order/:id', {
    schema: {
      params: idParamsSchema,
      response: {
        200: {
          type: 'object',
          properties: {
            order: orderResponseSchema
          }
        }
      }
    }
  }, async (request, reply) => {
    let Order = require('../schema').Order;

    const order = await Order.findById(request.params.id);
    if (!order) {
      return reply.code(404).send({ error: 'Order not found' });
    }

    return reply.code(200).send({ order: order.toJSON() });
  });
};