import './App.css';
import AuthProvider from './auth/Auth.provider';
import AppRouter from './routers/App.router';
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
  return (
        <AuthProvider>
        <AppRouter></AppRouter>
        </AuthProvider>
  );
}

export default App;
