import { ConfirmProvider } from './components/common/ConfirmProvider';
import Router from './routes/Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	return (
		<ConfirmProvider>
			<Router />
			<ToastContainer></ToastContainer>
		</ConfirmProvider>
	);
}

export default App;
