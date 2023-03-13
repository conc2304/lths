import { useRoutes } from 'react-router-dom';

import {DashRoutes,AuthenticationRoutes} from './layout-router-configs';
import { LayoutProvider } from '@lths/shared/ui-layouts'; 
import { useAppSelector } from '../store';

export default function ThemeRoutes() {
  
    const auth = useAppSelector(state=>state.auth);
    const authenticated = auth.authenticated;
    const routes = useRoutes([DashRoutes(authenticated),AuthenticationRoutes(authenticated)]);
    return (<LayoutProvider>{routes}</LayoutProvider>);
}
