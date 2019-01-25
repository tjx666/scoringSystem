import { createAppContainer, createStackNavigator } from "react-navigation";
import WelcomePage from "./layouts/WelcomePage";
import InputFirmData from './layouts/InputFirmData';

const AppNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage,
        navigationOptions: () => ({
            header: null
          }),
    },
    InputFirmData: {
        screen: InputFirmData
    }
}, { initialRouteName: 'WelcomePage' });

export default createAppContainer(AppNavigator);