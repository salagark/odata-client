import { Person } from "../types";
import { o as ODataClient, OdataConfig, OHandler } from "odata";

const ODATA_BASE_URL = "https://services.odata.org/TripPinRESTierService";

export class PeopleDataService {
	private static _instance: PeopleDataService;
	private baseUrl: string;

	private constructor(entityKey: string) {
		this.baseUrl = `${ODATA_BASE_URL}/(S(${entityKey}))/`;
	}

	public static register(entityKey: string) {
		if (!this._instance) {
			this._instance = new PeopleDataService(entityKey);
		}
	}

	public static getInstance() {
		if (!this._instance) {
			throw new Error("Service not registered");
		}

		return this._instance;
	}

	getAll(): Promise<Person[]> {
		return ODataClient(this.baseUrl, config).get("People").query();
	}

	get(userName: string): Promise<Person> {
		return ODataClient(this.baseUrl, config).get(`People('${userName}')`).query();
	}

	create(data: Partial<Person>) {
		return ODataClient(this.baseUrl, config).post("People", data).query();
	}

	update(userName: string, data: Partial<Person>) {
		return ODataClient(this.baseUrl, config).patch(`People('${userName}')`, data).query();
	}

	filter(options: FilterOptions) {
		return ODataClient(this.baseUrl, config)
			.get("People")
			.query({
				$filter: `${options.filterBy} eq '${options.value}'`,
			});
	}

	delete(id: string) {
		return ODataClient(this.baseUrl, config).delete(`People('${id}')`).query();
	}
}

const config: OdataConfig = {
	fragment: "value",
	onStart: (oHander: OHandler) => {
		return null;
	},
	onFinish: (oHander: OHandler, res) => {
		console.log(`API Request to ${res?.url} Successfully completed`);
		console.log(`Status Text : ${res?.statusText}`);
		console.log(`Status Code : ${res?.status}`);
		return null;
	},
	onError: (oHander: OHandler, res) => {
		console.log(`API Request to to ${res?.url} Failed with the following Error`);
		console.log(`Failure Status Text : ${res?.statusText}`);
		console.log(`Failute Status Code : ${res?.status}`);
		res?.text().then((message) => {
			console.log(`Failure Message : `, message);
			throw new Error(message);
		});
		return null;
	},
};

interface FilterOptions {
	filterBy: string;
	value: string;
}
