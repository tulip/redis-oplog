// { [mongoConnection] -> { [collectionName] -> Mongo.Collection } }
const map = new Map();

const constructor = Mongo.Collection;
const proto = Mongo.Collection.prototype;

const hook = function() {
    var ret = constructor.apply(this, arguments);

    const collectionName = arguments[0];
    const collection = this;
    const mongoConnection = collection._driver.mongo;

    if (!map.get(mongoConnection)) {
        map.set(mongoConnection, new Map());
    }

    map.get(mongoConnection).set(collectionName, collection);

    return ret;
};

hook.__getCollectionByName = function (mongoConnection, collectionName) {
    let connectionMap = map.get(mongoConnection);
    if (!connectionMap) {
        return undefined;
    }

  return connectionMap.get(collectionName);
};

hook.prototype = proto;
hook.prototype.constructor = hook;

for (var prop in constructor) {
    if (constructor.hasOwnProperty(prop)) {
        hook[prop] = constructor[prop];
    }
}

Mongo.Collection = hook;
Meteor.Collection = Mongo.Collection;
