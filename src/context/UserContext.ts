import { createContext } from "react";

const UserContext = createContext({
	user: null,
	nfts: [],
	total: 0,
	red: false,
	agregarUsuario: (e: any) => {},
	agregarNFT: (e: any) => {},
	cantidadNFTS: (e: any) => {},
	actualizarTotal: () => {},
	actualizarRed: (e: any) => {}
});

export default UserContext;
