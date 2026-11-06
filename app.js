const Fastify = require('fastify');
const db = require('./db');

const app = Fastify({
  logger: true
});

app.setErrorHandler((error, request, reply) => {
  if (error.validation) {
    return reply.code(400).send({
      error: 'Validation failed',
      details: error.validation.map((v) => ({
        field: v.instancePath || v.params?.missingProperty || '',
        message: v.message
      }))
    });
  }
  reply.code(error.statusCode || 500).send({ error: error.message || 'Internal Server Error' });
});

require('./routes')(app, db);

const start = async () => {
  try {
    await app.listen({ port: 3000 });
    console.log('Server running on http://localhost:3000');
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();