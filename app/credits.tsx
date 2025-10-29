import {View, Text, Image, StyleSheet} from "react-native";
import { router } from "expo-router";

export default function Index()
{

	return (
		<View style={styles.container}>
			<Text>Equipo [nombre de su app]</Text>
			<Text>Integrante 1</Text>
			<Text>Integrante 2</Text>
			<Text>Integrante 3</Text>
		</View>
	)
}

const styles=StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	}
});


