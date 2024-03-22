import Admin from './admin/paths';
import Assets from './assets/paths';
import Notifications from './notifications/paths';
import Pages from './pages/paths';
import { Home, Themes } from './paths-misc';
import Schedule from './schedule/paths';
import User from './user/paths';
// TODO - comment back in when we have working insights APIs
// import Insights from './insights/paths';
// const sections = [Home, Schedule, Themes, Pages, Assets, Notifications, Insights];

const sections = [Home, Schedule, Themes, Pages, Assets, Notifications, User, Admin];

export default sections;
