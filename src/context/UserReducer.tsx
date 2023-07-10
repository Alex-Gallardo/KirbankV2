// TYPES
import { ACTUALIZAR_RED, ACTUALIZAR_TOTAL, CANTIDAD_NFT, SELECCIONAR_NFT, SELECCIONAR_USUARIO } from "../types";

export default function UserReducer (state: any, action: any)  {
	switch (action.type) {
		case SELECCIONAR_USUARIO:
			return {
				...state,
				user: action.payload
			};

		case SELECCIONAR_NFT:
			return {
				...state,
				nfts: action.payload
			};

		case CANTIDAD_NFT:
			return {
				...state,
				nfts: state.nfts.map((nft: any) => (nft.id === action.payload.id ? (nft = action.payload) : nft))
			};

		case ACTUALIZAR_TOTAL:
			return {
				...state,
				// total: state.nfts.reduce((nuevoTotal: number, articulo: any) => (nuevoTotal += articulo.precio * articulo.cantidad), 0)
				total: state.nfts.reduce((nuevoTotal: number, nft: any) => (nuevoTotal += nft), 0)
			};

		case ACTUALIZAR_RED:
			return {
				...state,
				red: action.payload
			};
		default:
			return state;
	}
};
