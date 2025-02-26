import { ConfirmProvider } from './components/common/ConfirmProvider';
import Router from './routes/Router';

function App() {
	return (
		<ConfirmProvider>
			<Router />
		</ConfirmProvider>
	);
}

export default App;
