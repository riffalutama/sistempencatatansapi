
// Bring common classes into scope, and Fabric SDK network class
const {ROLE_peternak, capitalize, getMessage, validateRole} = require('../utils.js');
const network = require('../../patient-asset-transfer/application-javascript/app.js');


/**
 * @param  {Request} req Body must be a json, role in the header and patientId in the url
 * @param  {Response} res A 200 response if patient is updated successfully else a 500 response with s simple message json
 * @description Updates an existing asset(patient medical details) in the ledger. This method can be executed only by the peternak.
 */
exports.updatePatientMedicalDetails = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  await validateRole([ROLE_peternak], userRole, res);
  let args = req.body;
  args.patientId = req.params.patientId;
  args.changedBy = req.headers.username;
  args= [JSON.stringify(args)];
  // Set up and connect to Fabric Gateway
  const networkObj = await network.connectToNetwork(req.headers.username);
  // Invoke the smart contract function
  const response = await network.invoke(networkObj, false, capitalize(userRole) + 'Contract:updatePatientMedicalDetails', args);
  (response.error) ? res.status(500).send(response.error) : res.status(200).send(getMessage(false, 'Successfully Updated Patient.'));
};

/**
 * @param  {Request} req role in the header and hospitalId, peternakId in the url
 * @param  {Response} res A 200 response if peternak is present else a 500 response with a error json
 * @description This method retrives an existing peternak
 */
exports.getpeternakById = async (req, res) => {
  // User role from the request header is validated
  const userRole = req.headers.role;
  await validateRole([ROLE_peternak], userRole, res);
  const hospitalId = parseInt(req.params.hospitalId);
  // Set up and connect to Fabric Gateway
  const userId = hospitalId === 1 ? 'hosp1admin' : hospitalId === 2 ? 'hosp2admin' : 'hosp3admin';
  const peternakId = req.params.peternakId;
  const networkObj = await network.connectToNetwork(userId);
  // Use the gateway and identity service to get all users enrolled by the CA
  const response = await network.getAllpeternaksByHospitalId(networkObj, hospitalId);
  // Filter the result using the peternakId
  (response.error) ? res.status(500).send(response.error) : res.status(200).send(response.filter(
    function(response) {
      return response.id === peternakId;
    },
  )[0]);
};
