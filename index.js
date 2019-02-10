import { AppRegistry } from 'react-native';
import App from './js/App';
import { name as appName } from './app.json';
import Provider from 'react-redux';
import store from './js/store';

AppRegistry.registerComponent(appName, () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    )
});
