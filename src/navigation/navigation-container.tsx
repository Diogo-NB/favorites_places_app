import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";

import { RootStackParamList } from "@navigation/navigation-types";
import AllPlaces from "@screens/AllPlaces";
import AddPlace from "@screens/AddPlace";
import Map from "@screens/Map";
import PlaceDetails from "@screens/PlaceDetails";

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
        <RootStack.Screen name="map" component={Map} />
        <RootStack.Screen name="PlaceDetails" component={PlaceDetails} />
      </RootStack.Navigator>
    </NavigationContainer>
  );
}
