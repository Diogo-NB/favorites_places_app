import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./navigation-types";
import { NavigationContainer } from "@react-navigation/native";
import AllPlaces from "../screens/AllPlaces";
import AddPlace from "../screens/AddPlace";
import Map from "../screens/Map";

const RootStack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigationContainer() {
  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="allPlaces">
        <RootStack.Screen
          name="allPlaces"
          component={AllPlaces}
          options={{ title: "Your favorite Places" }}
        />
        <RootStack.Screen
          name="addPlace"
          component={AddPlace}
          options={{ title: "Add a new Place" }}
        />
        <RootStack.Screen
          name="map"
          component={Map}
          options={{ title: "Map" }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}