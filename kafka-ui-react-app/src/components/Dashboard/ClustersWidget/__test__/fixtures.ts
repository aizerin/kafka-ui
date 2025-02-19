import { Cluster, ServerStatus } from 'generated-sources';

export const onlineCluster: Cluster = {
  name: 'secondLocal',
  defaultCluster: false,
  status: ServerStatus.ONLINE,
  brokerCount: 1,
  onlinePartitionCount: 6,
  topicCount: 3,
  bytesInPerSec: 0.000030618196853764715,
  bytesOutPerSec: 5.737800890036267075817,
  readOnly: false,
};

export const offlineCluster: Cluster = {
  name: 'local',
  defaultCluster: true,
  status: ServerStatus.OFFLINE,
  brokerCount: 1,
  onlinePartitionCount: 2,
  topicCount: 2,
  bytesInPerSec: 8000.0000067376808542600021,
  bytesOutPerSec: 0.8153063567297119490871,
  readOnly: true,
};

export const clusters: Cluster[] = [onlineCluster, offlineCluster];
