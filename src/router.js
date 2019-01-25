import {createAppContainer, createStackNavigator} from "react-navigation";
import WelcomePage from "./pages/WelcomePage";

const AppNavigator = createStackNavigator({
    WelcomePage: {
        screen: WelcomePage
    }
});

export default createAppContainer(AppNavigator);