export interface Person {
	UserName: string;
	FirstName: string;
	LastName: string;
	MiddleName: string;
	Gender: string;
	Age: number;
	Emails: string[];
	FavoriteFeature: string;
	Features: string[];
	AddressInfo: AddressInfo[];
	HomeAddress: string;
}

export interface AddressInfo {
	Address: string;
	City: {
		Name: string;
		CountryRegion: string;
		Region: string;
	};
}
