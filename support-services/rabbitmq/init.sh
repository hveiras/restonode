#!/bin/sh

# Create Default RabbitMQ setup
( sleep 10 ; \

/usr/sbin/rabbitmq-plugins enable rabbitmq_management ; \

/usr/sbin/rabbitmq-plugins enable rabbitmq_tracing ; \

# Create users
# rabbitmqctl add_user <username> <password>
rabbitmqctl add_user nodejs nodejs ; \

# Set user rights
# rabbitmqctl set_user_tags <username> <tag>
rabbitmqctl set_user_tags nodejs administrator ; \

# Create vhosts
# rabbitmqctl add_vhost <vhostname>
# rabbitmqctl add_vhost dummy ; \

# Set vhost permissions
# rabbitmqctl set_permissions -p <vhostname> <username> ".*" ".*" ".*"
rabbitmqctl set_permissions -p / nodejs ".*" ".*" ".*" ; \
) &
rabbitmq-server $@
