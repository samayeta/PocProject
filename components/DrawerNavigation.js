import * as React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Characters from './Characters';

function DrawerNavigation() {
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator useLegacyImplementation>
      <Drawer.Screen name="Rick & Morty Characters" component={Characters} />
    </Drawer.Navigator>
  );
}

export default DrawerNavigation;
