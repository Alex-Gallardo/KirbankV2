export interface TokenSchema {
	_id: number;
	// Datos del propietario
	owner: string;
	ownerMail: string;
	ownerWallet: string;
	// Imagen del token
	imageUrl: string;
	// Data calculadora
	amount: number;
	percent: number;
	yearsSet: number;
	// Metodo de pago
	paymentMethod: string;
	// Fecha de creacion
	dateCreate: number;
	// Estado del token
	applicationStatus: string;
	// dataURI del ERC-721
	dataUri?: string;
	// A que coleccion de nft pertenece
	collection?: string;
	files?: any;
	// Fecha de ultima actualizacion (aprove)
	updated?: number
}

// dataURI del ERC-721
export interface TokenDataURI {
	tokenId: string;
	name: string;
	description: string;
	image: string;
	symbol: string;
	cost: string;
	amount: string;
	yearsSet: string;
	dateCreate: string;
}
