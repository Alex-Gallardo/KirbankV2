// TYPES
import { 
	UPDATE_USUARIO, 
	UPDATE_NFT, 
	UPDATE_WALLET,
	UPDATE_RED, 
	UPDATE_TOTAL, 
	CANTIDAD_NFT, 
 } from "../../types";

export default function UserReducer(state: any, action: any) {
	switch (action.type) {
		// Actualizar usuario
		case UPDATE_USUARIO:
			return {
				...state,
				user: action.payload
			};

		// Actualizar NFTS
		case UPDATE_NFT:
			return {
				...state,
				nfts: action.payload
			};

		// Actualizar la red
		case UPDATE_RED:
			return {
				...state,
				red: action.payload
			};

		// Actualizar la wallet
		case UPDATE_WALLET:
			return {
				...state,
				wallet: action.payload
			};

		// Actualizar total de NFTS
		case UPDATE_TOTAL:
			return {
				...state,
				// total: state.nfts.reduce((nuevoTotal: number, articulo: any) => (nuevoTotal += articulo.precio * articulo.cantidad), 0)
				total: state.nfts.reduce((nuevoTotal: number, nft: any) => (nuevoTotal += nft), 0)
			};

		// case CANTIDAD_NFT:
		// 	return {
		// 		...state,
		// 		nfts: state.nfts.map((nft: any) => (nft.id === action.payload.id ? (nft = action.payload) : nft))
		// 	};

		default:
			return state;
	}
}
