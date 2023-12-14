import { userRolesStub } from './roles.stub';
import { getSuccessfulResponse } from '../api';

const response = [getSuccessfulResponse('/roles', { data: userRolesStub })];

export default response;
