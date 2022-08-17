/* eslint-disable */

/**
 * Login
 */
exports.login = function login()
{
    return new Promise((resolve, reject) => {
        callPlugin('login', [], resolve, reject);
    });
};

/**
 * Unlock achievement
 * @param {String} params.id - id of achievement
 */
exports.unlockAchievement = function unlockAchievement(params)
{
    params = defaults(params, {});
    if (params.hasOwnProperty('id') === false)
    {
        throw new Error('You should specify id of achievement');
    }
    return new Promise((resolve, reject) => {
        callPlugin('unlockAchievement', [params.id], resolve, reject);
    });
};

/**
 * Increment achievement
 * @param {String} params.id - id of achievement
 * @param {Number} params.count - count of how much increment achievement
 */
exports.incrementAchievement = function incrementAchievement(params)
{
    params = defaults(params, {});
    if (params.hasOwnProperty('id') === false || params.hasOwnProperty('count') === false)
    {
        throw new Error('You should specify id of achievement and count how much to increase');
    }
    return new Promise((resolve, reject) => {
        callPlugin('incrementAchievement', [params.id, params.count], resolve, reject);
    });
};

/**
 * Show achievements
 */
exports.showAchievements = function showAchievements()
{
    return new Promise((resolve, reject) => {
        callPlugin('showAchievements', [], resolve, reject);
    });
};

/**
 * Update player score
 * @param {String} params.id - id of leaderboard
 * @param {Number} params.score - player score to set
 */
exports.updatePlayerScore = function updatePlayerScore(params)
{
    params = defaults(params, {});
    if (params.hasOwnProperty('id') === false || params.hasOwnProperty('score') === false)
    {
        throw new Error('You should specify id of leaderboard and player score you want to set');
    }
    return new Promise((resolve, reject) => {
        callPlugin('updatePlayerScore', [params.id, params.score], resolve, reject);
    });
};

/**
 * Load player score
 * @param {String} params.id - id of leaderboard
 */
exports.loadPlayerScore = function loadPlayerScore(params)
{
    params = defaults(params, {});
    if (params.hasOwnProperty('id') === false)
    {
        throw new Error('You should specify leaderboard id');
    }
    return new Promise((resolve, reject) => {
        callPlugin('loadPlayerScore', [params.id], resolve, reject);
    });
};

/**
 * Show leaderboard
 * @param {String} params.id - id of leaderboard
 */
exports.showLeaderboard = function showLeaderboard(params)
{
    params = defaults(params, {});
    if (params.hasOwnProperty('id') === false)
    {
        throw new Error('You should specify leaderboard id');
    }
    return new Promise((resolve, reject) => {
        callPlugin('showLeaderboard', [params.id], resolve, reject);
    });
};

/**
 * Show saved games
 * @param {String} params.title - The title to display in the action bar
 * @param {Boolean} params.allowAddButton - Whether or not to display a "create new snapshot" option
 * @param {Boolean} params.allowDelete - Whether or not to provide a delete overflow menu option for each snapshot
 * @param {Number} params.maxSnapshots - The maximum number of snapshots to display
 */
exports.showSavedGames = function showSavedGames(params)
{
    params = defaults(params, {});
    if (
      params.hasOwnProperty('title') === false ||
      params.hasOwnProperty('allowAddButton') === false ||
      params.hasOwnProperty('allowDelete') === false ||
      params.hasOwnProperty('maxSnapshots') === false
    ) {
        throw new Error('You should specify title, allowAddButton, allowDelete and maxSnapshots parameters');
    }
    return new Promise((resolve, reject) => {
        callPlugin('showSavedGames', [params.title, params.allowAddButton, params.allowDelete, params.maxSnapshots], resolve, reject);
    });
};

/**
 * Save game
 * @param {String} params.snapshotName - The inner used name for snapshot, should be unique for each game save
 * @param {String} params.snapshotDescription - The snapshot description, will be shown in saves list UI
 * @param {Object} params.snapshotContents - Object you want to save
 */
exports.saveGame = function saveGame(params)
{
    params = defaults(params, {});
    if (
      params.hasOwnProperty('snapshotName') === false ||
      params.hasOwnProperty('snapshotDescription') === false ||
      params.hasOwnProperty('snapshotContents') === false
    ) {
        throw new Error('You should specify snapshotName, snapshotDescription and snapshotContents parameters');
    }
    return new Promise((resolve, reject) => {
        callPlugin('saveGame', [params.snapshotName, params.snapshotDescription, params.snapshotContents], resolve, reject);
    });
};

/**
 * Save game
 * @param {String} params.snapshotName - The inner used name for snapshot, should be unique for each game save
 */
exports.loadGameSave = function loadGameSave(params)
{
    params = defaults(params, {});
    if (params.hasOwnProperty('snapshotName') === false) {
        throw new Error('You should specify snapshotName parameter');
    }
    return new Promise((resolve, reject) => {
        callPlugin('loadGameSave', [params.snapshotName], resolve, reject);
    });
};

/**
 * Helper function to call cordova plugin
 * @param {String} name - function name to call
 * @param {Array} params - optional params
 * @param {Function} onSuccess - optional on sucess function
 * @param {Function} onFailure - optional on failure functioin
 */
function callPlugin(name, params, onSuccess, onFailure)
{
    cordova.exec(function callPluginSuccess(result)
    {

        if (isFunction(onSuccess))
        {
            onSuccess(result);
        }
    }, function callPluginFailure(error)
    {
        if (isFunction(onFailure))
        {
            onFailure(error)
        }
    }, 'GameCenterPlugin', name, params);
}

/**
 * Helper function to check if a function is a function
 * @param {Object} functionToCheck - function to check if is function
 */
function isFunction(functionToCheck)
{
    var getType = {};
    var isFunction = functionToCheck && getType.toString.call(functionToCheck) === '[object Function]';
    return isFunction === true;
}

/**
 * Helper function to do a shallow defaults (merge). Does not create a new object, simply extends it
 * @param {Object} o - object to extend
 * @param {Object} defaultObject - defaults to extend o with
 */
function defaults(o, defaultObject)
{
    if (typeof o === 'undefined')
    {
        return defaults({}, defaultObject);
    }

    for (var j in defaultObject)
    {
        if (defaultObject.hasOwnProperty(j) && o.hasOwnProperty(j) === false)
        {
            o[j] = defaultObject[j];
        }
    }

    return o;
}
