// TYPES
import { ACTUALIZAR_RED, ACTUALIZAR_TOTAL, CANTIDAD_NFT, SELECCIONAR_NFT, SELECCIONAR_USUARIO } from "../types";

// CONTEXT
import UserContext from "./UserContext";
// REDUCER
import UserReducer from "./UserReducer";
import { useEffect, useReducer } from "react";
import { useRouter } from "next/router";

const UserState = ({ children }: any) => {
	const router = useRouter();

	// State inicila
	const initialState: {usuario: string | undefined, nfts: any[], total: number, red:boolean} = {
		usuario: undefined,
		nfts: [],
		total: 0,
		red: false
	};

	const [state, dispatch] = useReducer(UserReducer, initialState);

	// Modifica el usuario
	const agregarUsuario = (user: any) => {
		console.log("Actualizar usuario", user);
		dispatch({
			type: SELECCIONAR_USUARIO,
			payload: user
		});
	};

	// Agregar nft
	const agregarNFT = (nfsSeleccionados: any) => {
		// Solucionar problema de reescritura de productos
		let newState;

		if (state.nfs.length > 0) {
			// Tomar del segundo arreglo una copia para asignarlo al primero
			newState = nfsSeleccionados.map((nft: any) => {
				const nuevoObjeto = state.nfts.find((nftState: any) => nftState.id === nft.id);
				return { ...nft, ...nuevoObjeto };
			});
		} else {
			newState = nfsSeleccionados;
		}

		dispatch({
			type: SELECCIONAR_NFT,
			payload: newState
		});
	};

	// Modifica las cantidades de los NFTs
	const cantidadNFTS = (nuevoNFT: any) => {
		dispatch({
			type: CANTIDAD_NFT,
			payload: nuevoNFT
		});
	};

	// Actualizar total
	const actualizarTotal = () => {
		dispatch({
			type: ACTUALIZAR_TOTAL
		});
	};

	// Actualizar red
	const actualizarRed = (value: any) => {
		console.log("Actualizar red", value);
		dispatch({
			type: ACTUALIZAR_RED,
			payload: value
		});
	};

	useEffect(() => {
		console.log("Entro a UserState")
		if(state.usuario == undefined){
			router.pathname != "/login" ? router.replace("/login") : "";
		}
	}, []);

	return (
		<UserContext.Provider
			value={{
				usuario: state.usuario,
				nfts: state.nfts,
				total: state.total,
				red: state.red,
				agregarUsuario,
				agregarNFT,
				cantidadNFTS,
				actualizarTotal,
				actualizarRed
			}}
		>
			{children}
		</UserContext.Provider>
	);
};

export default UserState;
function toast(arg0: { title: string; status: string; duration: number; isClosable: boolean; variant: string; position: string; }) {
	throw new Error("Function not implemented.");
}

