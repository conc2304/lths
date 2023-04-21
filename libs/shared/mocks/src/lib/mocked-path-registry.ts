import { MSWPathConf } from './types';
import insightsMockInterceptors from '../lib/modules/insights';

const mockedPaths: MSWPathConf[] = [...insightsMockInterceptors];

export default mockedPaths;
