import { createAppContainer, createStackNavigator } from "react-navigation";
import Welcome from "./layouts/Welcome";
import InputFirmData from './layouts/InputFirmData';
import Charts from './layouts/Charts';

const AppNavigator = createStackNavigator({
    Welcome: {
        screen: Welcome,
        navigationOptions: () => ({
            header: null
        }),
    },
    InputFirmData: {
        screen: InputFirmData,
        navigationOptions: () => ({
            header: null
        }),
    },
    Charts: {
        screen: Charts
    }
}, { initialRouteName: 'Welcome' });

export default createAppContainer(AppNavigator);