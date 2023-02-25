// TYPES
import { ACTUALIZAR_RED, ACTUALIZAR_TOTAL, CANTIDAD_NFT, SELECCIONAR_NFT, SELECCIONAR_USUARIO } from "../types";

// CONTEXT
import UserContext from "./UserContext";
// REDUCER
import UserReducer from "./UserReducer";
import { useReducer } from "react";

const UserState = ({ children }: any) => {
	// State inicila
	const initialState = {
		usuario: "",
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
	const actualizarRed = (indi: any) => {
		console.log("Actualizar red", indi);
		dispatch({
			type: ACTUALIZAR_RED,
			payload: indi
		});
	};

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
