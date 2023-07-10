import "firebase/auth";
import {
	getAuth,
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	// onAuthStateChanged,
	signInWithPopup,
	User as UserFB,
	// FacebookAuthProvider,
	GoogleAuthProvider,
	getAdditionalUserInfo,
	UserCredential
} from "firebase/auth";

import { firebaseApp } from "../../keys/firebase";
import { saveInCollection } from "./DB";
import { UserSchema } from "@/schemas/UserSchema";

// let FacebookProvider = new FacebookAuthProvider();
let GoogleProvider = new GoogleAuthProvider();

const getAuthUser = async () => {
	return getAuth(firebaseApp);
};

export const register = async (email: string, pass: string, name: string, last_name: string) => {
	return createUserWithEmailAndPassword(await getAuthUser(), email, pass).then((res: UserCredential) => {
		if (getAdditionalUserInfo(res)?.isNewUser) saveUser(res, name, last_name);
	});
};

export const login = async (email: string, pass: string) => {
	return signInWithEmailAndPassword(await getAuthUser(), email, pass).catch((err) => {
		window.alert({
			title: "Correo invalido!",
			body: "Ingresa un correo que sea valido.",
			type: "error",
			onConfirm: () => {
				location.reload();
			}
		});
	});
};

// export const facebookLogin = async () => {
// 	const auth = await getAuthUser();
// 	return signInWithPopup(auth, FacebookProvider).then((res: UserCredential) => {
// 		if (getAdditionalUserInfo(res)?.isNewUser) saveUser(res);
// 	});
// };

export const googleLogin = async () => {
	const auth = await getAuthUser();
	return signInWithPopup(auth, GoogleProvider)
		.then((res: UserCredential) => {
			if (getAdditionalUserInfo(res)?.isNewUser) saveUser(res);
			return res;
		})
		.catch((err) => {
			// **CAMBIAR A TOAST
			//   window.Alert({
			//     title: "Problemas a ingresar?",
			//     body: "Intenta recargar la pagina o intentalo de nuevo",
			//     type: "error",
			//   });

			console.log("error-de-googleLogin-Auth:", err);
		});
};

export const logout = async () => {
	const auth = await getAuthUser();
	window.postMessage({
		action: "logout"
	});
	return auth.signOut();
};

// **ANALIZAR
// export const userListener = async (callback: (user: UserFB) => unknown) => {
//   return onAuthStateChanged(await getAuthUser(), callback);
// };

export const saveUser = async (cred: UserCredential, name?: string, last_name?: string) => {
	const {
		user: { uid, email, photoURL, displayName, phoneNumber, metadata }
	} = cred;

	const tmpUser: UserSchema = {
		_id: uid,
		name: name || "",
		lastName: last_name || "",
		displayName: displayName || "",
		authMode: "google",
		photoURL: photoURL || "",
		mail: email || "@undefined.error",
		phone: phoneNumber || "",
		tokens: [],
		// Opcionales
		// @ts-ignore
		created: metadata.createdAt
	};
	saveInCollection<any>(tmpUser, uid, "users");
};
