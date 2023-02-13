/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const PrimaryContract = require('./lib/primary-contract.js');
const AdminContract = require('./lib/admin-contract.js');
const PatientContract = require('./lib/patient-contract.js');
const peternakContract = require('./lib/peternak-contract.js');

module.exports.contracts = [ PrimaryContract, AdminContract, peternakContract, PatientContract ];
