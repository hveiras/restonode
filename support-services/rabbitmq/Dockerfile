FROM rabbitmq

# Add script to create default users / vhosts
ADD init.sh /init.sh

# Set correct executable permissions
RUN chmod +x /init.sh

# Define default command
CMD ["/init.sh"]

## RUN  ["/usr/sbin/rabbitmq-plugins", "enable", "rabbitmq_management"]

## RUN ["rabbitmqctl", "add_user", "nodejs", "nodejs"]

## RUN ["rabbitmqctl", "set_user_tags", "nodejs", "administrator"]

EXPOSE 15672 5672 4369
