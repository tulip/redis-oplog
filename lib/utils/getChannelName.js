import Config from '../config';

/**
 * Given a base channel name, applies the global prefix.
 *
 * @param baseChannelName
 * @return {string}
 */
export default function getChannelName(baseChannelName) {
    let prefix = '';
    if (_.isFunction(Config.globalRedisPrefix)) {
        prefix = Config.globalRedisPrefix(mongoConnection);
    } else if (_.isString(Config.globalRedisPrefix)) {
        prefix = Config.globalRedisPrefix;
    }

    return prefix + baseChannelName;
}
