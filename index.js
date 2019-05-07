import { AppRegistry } from 'react-native';
import Root from './src/app/main/Root';

//remove warning
console.disableYellowBox = true;

AppRegistry.registerComponent('HuBay', () => Root);
