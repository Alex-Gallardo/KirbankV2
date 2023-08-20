// TYPES
import { 
	UPDATE_USUARIO,
	UPDATE_NFT, 
	UPDATE_WALLET,
	UPDATE_RED, 
	UPDATE_TOTAL, 
	CANTIDAD_NFT, 
 } from "../../types";
import { useEffect, useReducer } from "react";

// CONTEXT
import UserContext from "./UserContext";
// REDUCER
import UserReducer from "./UserReducer";
import { useRouter } from "next/router";

const UserState = ({ children }: any) => {
	const router = useRouter();

	// State inicila
	const initialState: {user: any, nfts: any[],wallet: string, red:boolean,  total: number,} = {
		user: null,
		nfts: [],
		wallet: '',
		red: false,
		total: 0,
	};

	const [state, dispatch] = useReducer(UserReducer, initialState);

	// Modifica el usuario
	const upUser = (user: any) => {
		console.log("Actualizar usuario", user);
		dispatch({
			type: UPDATE_USUARIO,
			payload: user
		});
	};

	// Agregar nft's
	const upNFT = (nftsArray: any) => {
		// Solucionar problema de reescritura de productos
		// let newState;

		// if (state.nfts.length > 0) {
		// 	// Tomar del segundo arreglo una copia para asignarlo al primero
		// 	newState = nftsArray.map((nft: any) => {
		// 		const nuevoObjeto = state.nfts.find((nftState: any) => nftState.id === nft.id);
		// 		return { ...nft, ...nuevoObjeto };
		// 	});
		// } else {
		// 	newState = nftsArray;
		// }

		dispatch({
			type: UPDATE_NFT,
			payload: nftsArray
		});
	};

	// Actualizar wallet
	const upWallet = (value: any) => {
		console.log("Actualizar wallet", value);
		dispatch({
			type: UPDATE_WALLET,
			payload: value
		});
	};
	
	// Actualizar red
	const upRed = (value: any) => {
		console.log("Actualizar red", value);
		dispatch({
			type: UPDATE_RED,
			payload: value
		});
	};
	
	// Actualizar total
	const upTotal = () => {
		console.log("Actualizar total");
		dispatch({
			type: UPDATE_TOTAL
		});
	};

	// Modifica las cantidades de los NFTs
	const cantidadNFTS = (nuevoNFT: any) => {
		dispatch({
			type: CANTIDAD_NFT,
			payload: nuevoNFT
		});
	};

	useEffect(() => {
		if(router.pathname != '/'){
			if(state.user == null) router.replace("/login")
		}

		console.log('pathname: ' , router.pathname)
		// router.pathname != "/login" ? router.replace("/login") : "";
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<UserContext.Provider
			value={{
				user: state.user,
				nfts: state.nfts,
				wallet: state.wallet,
				red: state.red,
				total: state.total,
				upUser,
				upNFT,
				upWallet,
				upRed,
				upTotal,
				cantidadNFTS,
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserState;