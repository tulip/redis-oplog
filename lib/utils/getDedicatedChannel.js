import { MongoID } from 'meteor/mongo-id';
import getChannelName from './getChannelName';

export default function getDedicatedChannel(mongoConnection, collectionName, docId){
  const channelName = `${collectionName}::${MongoID.idStringify(docId)}`;
  return getChannelName(mongoConnection, channelName);
}
