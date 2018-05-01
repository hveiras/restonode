'use strict';

const { expect } = require('chai');

const proxyquire = require('proxyquire').noCallThru().noPreserveCache();

const configStub = {
  rabbitmq: ''
};

const amqplibStub = {
  connect: () => ({
    createChannel: () => ({
      sendToQueue: () => true
    })
  })
};

const getCreateOrder = proxyquire('../lib/routes/order/createOrder', {
  'config': configStub,
  'amqplib': amqplibStub
})

describe('Order Routes', () => {
  it('should create an order', async () => {
    const reqStub = {
      params: {
        restaurantId: 1
      },
      body: {
        meals: [
          { name: 'Entraña' },
          { name: 'Salmón a la parrilla' }
        ]
      }
    }

    const resStub = {
      status: code => {
        expect(code).to.equal(201);
        return {
          send: orderData => expect(orderData).to.deep.equal({
            id: 1,
            name: 'Las Cholas',
            latLng: '-34.570966, -58.430635',
            eta: { duration: { text: '14 hours 56 mins', value: 53778 } }
          })
        }
      }
    }

    const restaurantMock = {
      id: 1,
      name: 'Las Cholas',
      latLng: '-34.570966, -58.430635'
    };

    const durationMock = {
      duration: {
        text: "14 hours 56 mins",
        value: 53778
      }
    };

    const modelsStub = {
      Restaurant: {
        findOne: () => restaurantMock
      },
      Order: {
        create: () => ({
          setMeals: () => { },
          get: () => restaurantMock
        }),
        calculateEta: () => durationMock
      }
    };

    const createOrder = getCreateOrder(modelsStub);
    await createOrder(reqStub, resStub);
  });
});
