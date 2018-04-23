'use strict';

const amqplib = require('amqplib');
const config = require('config');

amqplib.connect(config.rabbitmq)
  .then(conn => conn.createChannel())
  .then(ch => {
    ch.assertQueue('orders');
    ch.consume('orders', msg => {
      console.log(' [x] Received new Order %s', msg.content.toString());
      // TODO: here I would send an Email.
    }, {noAck: true});

    ch.assertQueue('notifications');
    ch.consume('notifications', msg => {
      console.log(' [x] Received new Notification %s', msg.content.toString());
      // TODO: here I would send SMS notification.
    }, {noAck: true});
  });