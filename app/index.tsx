import { Text, View, StyleSheet, 
		TextInput, Pressable,
		Button, Platform
} from "react-native";
import { useFonts } from "expo-font";
import IconRocket from './iconrocket';
import IconRobot from './robot';
import { Endpoints } from "@/constants/Endpoints";
import { useContext, useState } from 'react'
import { MyContext } from "./Context";
import * as Crypto from 'expo-crypto';
import { Link, router } from "expo-router";

//https://docs.expo.dev/develop/user-interface/fonts/
//https://reactsvgicons.com/react-svg-icons-guide

//https://docs.expo.dev/router/introduction/
//https://docs.expo.dev/router/navigating-pages/

//https://react.dev/learn/passing-data-deeply-with-context

export default function Index() {

	const [loaded, error] = useFonts({
		'poppins': require('../assets/fonts/PoppinsSemiBold.ttf'),
	  });
	const [userValue, setUserValue] = useState('');
	const [passValue, setPassValue] = useState('');
	const [failedLogin, setFailedLogin]= useState(false);
	const {loginData, setLoginData}=useContext(MyContext);

	const onButtonLogin = async ()=>
	{
		console.log('logging in!');
		//hacer la peticion de login
		//console.log(Endpoints.LOGIN);
		const digest = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256,
			passValue);

		const form = new FormData();
		form.append('token','code37');
		form.append('user',userValue);
		form.append('pass', digest);

		fetch( Endpoints.LOGIN , {
			method:'POST',
			body:form
		})
		.then( response=>response.json())
		.then( data => {console.log(data) 
			if(!data.error && data.id)
			{
				setLoginData(data);
				router.replace('/mainmenu');
			}
			else
			{
				setFailedLogin(true);
			}
		})
		.catch( err=>{console.log(err)});
	}

  return (
    <View style={styles.container}>
		<IconRocket width="150" height="150"></IconRocket>
		<Text style={styles.title}>Appify</Text>
		<Text style={styles.subtitle}>¡Te damos la bienvenida!</Text>

		<Link href="./pruebafoto" asChild>
			<Button title="Prueba de imagen"></Button>
		</Link>
		
		<View style={styles.inputfieldlabel}>
			<Text >Usuario</Text>
			<TextInput style={styles.input} onChangeText={setUserValue}></TextInput>
		</View>
		<View style={styles.inputfieldlabel}>
			<Text >Contraseña</Text>
			<TextInput style={styles.input} onChangeText={setPassValue} secureTextEntry></TextInput>
		</View>
		{failedLogin? (<Text style={styles.error}>fallo al login</Text>):undefined}
		<Pressable style={styles.botonconlogo} onPress={onButtonLogin} >
			<IconRobot width='32' height='32'></IconRobot>
			<Text>Log in!</Text>
		</Pressable>
		<Text >¿No tienes una cuenta?</Text>
		<Pressable style={styles.botonconlogo}>
			<IconRobot width='32' height='32'></IconRobot>
			<Text>Regístrate.</Text>
		</Pressable>

    </View>
	
  );
}

const styles=StyleSheet.create(
	{
		container:{
			flex: 1,
			justifyContent: "center",
			alignItems: "center",
		},
		title:{
			fontFamily:'poppins',
			fontSize:44
		},
		subtitle:{
			fontFamily:'poppins',
			fontSize:18
		},
		inputfieldlabel:
		{
			flexDirection:'row',
			alignItems: 'center',
			justifyContent: 'flex-end',
			width:'60%'
		},
		input: {
			height: 40,
			width:150,
			margin: 12,
			borderWidth: 1,
			padding: 10,
		  },
		botonconlogo:
		{
			backgroundColor:'#F9D689',
			flexDirection:'row',
			alignItems: 'center',
			padding:5,
			borderRadius:5,
			borderColor:'#000',
			borderWidth:2,
			width:150
		},
		error:{
			padding:5,
			color:"#F22"
		}
		//#973131 #E0A75E #F9D689 #F5E7B2
		
	}
)