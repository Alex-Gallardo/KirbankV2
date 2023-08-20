import { createContext } from "react";

const UserContext = createContext({
	user: null,
	nfts: [],
	wallet: "",
	red: false,
	total: 0,
	upUser: (e: any) => {},
	upNFT: (e: any) => {},
	upWallet: (e: any) => {},
	upRed: (e: any) => {},
	upTotal: () => {},
	cantidadNFTS: (e: any) => {},
});

export default UserContext;
