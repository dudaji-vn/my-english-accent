import { useRoutes } from 'react-router-dom';
import routes from './routers';
import theme from './shared/theme/theme';
import { ThemeProvider } from '@mui/material/styles';
import ManagerData from './shared/utils/manageData.util';

function App() {
  const token = ManagerData.getToken();
  const routing = useRoutes(routes(!!token));
  return (
    <ThemeProvider theme={theme}>
      {routing}
    </ThemeProvider>
  );
}

export default App;


