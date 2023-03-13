import { useRoutes } from 'react-router-dom';

import {DashRoutes,AuthenticationRoutes} from './layout-router-configs';
import { LayoutProvider } from '@lths/shared/ui-layouts'; 
import { useAppSelector } from '@lths/features/mms/data-access';

export default function ThemeRoutes() {
  
    const auth = useAppSelector(state=>state.auth);
    const {authenticated} = auth;
    const routes = useRoutes([DashRoutes(authenticated),AuthenticationRoutes(authenticated)]);
    return (<LayoutProvider>{routes}</LayoutProvider>);
}
