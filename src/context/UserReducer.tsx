// TYPES
import { SELECCIONAR_USUARIO, SELECCIONAR_NFT, CANTIDAD_NFT, ACTUALIZAR_TOTAL } from "../types";
import { ACTUALIZAR_RED } from "./../types/index";

export default (state: any, action: any) => {
	switch (action.type) {
		case SELECCIONAR_USUARIO:
			return {
				...state,
				usuario: action.payload
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
