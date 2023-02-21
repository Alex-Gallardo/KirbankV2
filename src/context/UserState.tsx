import { useReducer } from "react";

// CONTEXT
import UserContext from "./UserContext";

// REDUCER
import UserReducer from "./UserReducer";

// TYPES
import { SELECCIONAR_USUARIO, SELECCIONAR_NFT, CANTIDAD_NFT, ACTUALIZAR_TOTAL, ACTUALIZAR_RED } from "../types/index";

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

	// ACtualizar red
	const actualizarRed = (state: boolean) => {
		dispatch({
			type: ACTUALIZAR_RED,
			payload: state
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
