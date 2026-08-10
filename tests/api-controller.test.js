const assert = require('assert');
const Trip = require('../app_api/models/travlr');
const controller = require('../app_api/controllers/trips');

const createResponse = () => ({
  statusCode: 200,
  body: undefined,
  status(code) {
    this.statusCode = code;
    return this;
  },
  json(value) {
    this.body = value;
    return this;
  },
  send(value) {
    this.body = value;
    return this;
  }
});

const run = async () => {
  const originalFind = Trip.find;
  const originalFindOne = Trip.findOne;
  const originalCreate = Trip.create;
  const originalFindOneAndUpdate = Trip.findOneAndUpdate;
  const originalFindOneAndDelete = Trip.findOneAndDelete;

  try {
    Trip.find = () => ({
      sort: () => ({ exec: async () => [{ code: 'GALR' }, { code: 'DAWR' }] })
    });

    let response = createResponse();
    await controller.tripsList({}, response);
    assert.strictEqual(response.statusCode, 200);
    assert.ok(Array.isArray(response.body));

    Trip.findOne = ({ code }) => ({
      exec: async () => (code === 'GALR' ? { code: 'GALR' } : null)
    });

    response = createResponse();
    await controller.tripsFindByCode({ params: { tripCode: 'galr' } }, response);
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.code, 'GALR');

    response = createResponse();
    await controller.tripsFindByCode({ params: { tripCode: 'xxxx' } }, response);
    assert.strictEqual(response.statusCode, 404);
    assert.strictEqual(typeof response.body.message, 'string');

    Trip.findOne = () => ({ exec: async () => null });
    Trip.create = async (payload) => ({ ...payload, _id: 'new-trip-id' });
    response = createResponse();
    await controller.tripsAddTrip({ body: sampleTrip('TEST') }, response);
    assert.strictEqual(response.statusCode, 201);
    assert.strictEqual(response.body.code, 'TEST');

    Trip.findOneAndUpdate = ({ code }, payload) => ({
      exec: async () => ({ ...payload, code, name: 'Updated Test Trip' })
    });
    response = createResponse();
    await controller.tripsUpdateTrip(
      { params: { tripCode: 'test' }, body: sampleTrip('TEST') }, response
    );
    assert.strictEqual(response.statusCode, 200);
    assert.strictEqual(response.body.name, 'Updated Test Trip');

    Trip.findOneAndDelete = ({ code }) => ({ exec: async () => ({ code }) });
    response = createResponse();
    await controller.tripsDeleteTrip({ params: { tripCode: 'test' } }, response);
    assert.strictEqual(response.statusCode, 204);

    Trip.find = () => ({
      sort: () => ({ exec: async () => { throw new Error('database unavailable'); } })
    });

    response = createResponse();
    await controller.tripsList({}, response);
    assert.strictEqual(response.statusCode, 500);
    assert.strictEqual(typeof response.body.message, 'string');

    console.log('API controller tests passed: GET, POST, PUT, DELETE, 404, and 500.');
  } finally {
    Trip.find = originalFind;
    Trip.findOne = originalFindOne;
    Trip.create = originalCreate;
    Trip.findOneAndUpdate = originalFindOneAndUpdate;
    Trip.findOneAndDelete = originalFindOneAndDelete;
  }
};

const sampleTrip = (code) => ({
  code,
  name: 'Test Trip',
  length: '2 nights / 3 days',
  start: '2026-12-01',
  resort: 'Travlr Test Resort',
  perPerson: '499.00',
  image: 'reef1.jpg',
  description: 'A trip created by the automated controller test.'
});

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
