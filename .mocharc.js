process.env.NODE_ENV = "test";

module.exports = {
    "slow": 1000,
    "timeout": 10000,
    "reporter": "spec",
    "require": [ "ts-node/register" ],
    "extension": [ "ts" ]
}
