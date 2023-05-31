import db from './components.db';
const payload = {
  data: db.components.getAll(),
};
export default payload;
