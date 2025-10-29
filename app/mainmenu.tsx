import {View, Text, Image, StyleSheet} from "react-native";
import { Link, router } from "expo-router";
import { useContext, useState } from 'react'
import { MyContext } from "./Context";



export default function Index()
{
	const {loginData, setLoginData}=useContext(MyContext);
	return (
		<View style={styles.container}>
			<View style={styles.profile}>
				<Text>Welcome back {loginData.firstname}!</Text>	
				<Image style={styles.pfp_image}
					source={{uri:loginData.pfp_url}} ></Image>
			</View>	
			
			
				<View style={styles.footer}>
				<Link href="/credits">
				<Text>Made with 🧡 by Appify Team.</Text>
				</Link>
				</View>	
		</View>
	)
}

const styles=StyleSheet.create({
	container:{
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	profile:{
		backgroundColor:"#Faa",
		width:300,
		height:300,
		padding:10
	},
	footer:{
		position:"absolute",
		bottom:5,
		backgroundColor:"#afa",
		padding:10,
	},
	pfp_image:{
		width:260,
		height:260,
		borderRadius:5
	}
});

