#!/bin/bash
cd
cd /
kafka_2.13-2.6.0/bin/zookeeper-server-start.sh kafka_2.13-2.6.0/config/zookeeper.properties

kafka_2.13-2.6.0/bin/kafka-server-start.sh kafka_2.13-2.6.0/config/server.properties