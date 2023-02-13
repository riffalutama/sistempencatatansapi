/* eslint-disable new-cap */
const fs = require('fs');
const {enrollAdminHosp1} = require('./enrollAdmin-Hospital1');
const {enrollAdminHosp2} = require('./enrollAdmin-Hospital2');
const {enrollRegisterUser} = require('./registerUser');
const {createRedisClient} = require('./utils');

const redis = require('redis');


/**
 * @description Enrolls and registers the patients in the initLedger as users.
 */
async function initLedger() {
  try {
    const jsonString = fs.readFileSync('../patient-asset-transfer/chaincode/lib/initLedger.json');
    const patients = JSON.parse(jsonString);
    let i = 0;
    for (i = 0; i < patients.length; i++) {
      const attr = {firstName: patients[i].firstName, lastName: patients[i].lastName, role: 'patient'};
      await enrollRegisterUser('1', 'PID'+i, JSON.stringify(attr));
    }
  } catch (err) {
    console.log(err);
  }
}
/**
 * @description Init the redis db with the admins credentials
 */
async function initRedis() {
  let redisUrl = 'redis://127.0.0.1:6379';
  let redisPassword = 'hosp1lithium';
  let redisClient = redis.createClient(redisUrl);
  redisClient.AUTH(redisPassword);
  redisClient.SET('hosp1admin', redisPassword);
  redisClient.QUIT();

  redisUrl = 'redis://127.0.0.1:6380';
  redisPassword = 'hosp2lithium';
  redisClient = redis.createClient(redisUrl);
  redisClient.AUTH(redisPassword);
  redisClient.SET('hosp2admin', redisPassword);
  console.log('Done');
  redisClient.QUIT();
  return;
}

/**
 * @description Create peternak in both organizations based on the initpeternaks JSON
 */
async function enrollAndRegisterpeternaks() {
  try {
    const jsonString = fs.readFileSync('./initpeternaks.json');
    const peternak = JSON.parse(jsonString);
    for (let i = 0; i < peternak.length; i++) {
      const attr = {firstName: peternak[i].firstName, lastName: peternak[i].lastName, role: 'peternak', speciality: peternak[i].speciality};
      // Create a redis client and add the peternak to redis
      peternak[i].hospitalId = parseInt(peternak[i].hospitalId);
      const redisClient = createRedisClient(peternak[i].hospitalId);
      (await redisClient).SET('HOSP' + peternak[i].hospitalId + '-' + 'DOC' + i, 'password');
      await enrollRegisterUser(peternak[i].hospitalId, 'HOSP' + peternak[i].hospitalId + '-' + 'DOC' + i, JSON.stringify(attr));
      (await redisClient).QUIT();
    }
  } catch (error) {
    console.log(error);
  }
};

/**
 * @description Function to initialise the backend server, enrolls and regsiter the admins and initLedger patients.
 * @description Need not run this manually, included as a prestart in package.json
 */
async function main() {
  await enrollAdminHosp1();
  await enrollAdminHosp2();
  await initLedger();
  await initRedis();
  await enrollAndRegisterpeternaks();
}


main();
