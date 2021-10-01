import { Component, ChangeEvent } from "react";
import { PeopleDataService } from "../services/people.service";
import { Person } from "../types";
import PersonForm from "./person-form";

interface AddPersonProps {}

interface AddPersonState {
	person: Person;
	personSaved: boolean;
}

export default class AddPerson extends Component<AddPersonProps, AddPersonState> {
	constructor(props: AddPersonProps) {
		super(props);
		this.changeHandler = this.changeHandler.bind(this);
		this.savePerson = this.savePerson.bind(this);
		this.addAddress = this.addAddress.bind(this);
		this.newPerson = this.newPerson.bind(this);

		this.state = {
			person: {
				AddressInfo: [],
				UserName: "",
				FirstName: "",
				MiddleName: "",
				LastName: "",
				Age: 0,
				Emails: [],
				FavoriteFeature: "",
				Features: [],
				Gender: "",
				HomeAddress: "",
			},
			personSaved: false,
		};
	}

	changeHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const currentPerson = this.state.person;
		switch (e.target.name) {
			case "UserName": {
				currentPerson.UserName = e.target.value;
				break;
			}
			case "FirstName": {
				currentPerson.FirstName = e.target.value;
				break;
			}
			case "MiddleName": {
				currentPerson.MiddleName = e.target.value;
				break;
			}
			case "LastName": {
				currentPerson.LastName = e.target.value;
				break;
			}
			case "Age": {
				currentPerson.Age = Number(e.target.value);
				break;
			}
			case "Emails": {
				currentPerson.Emails = e.target.value.split(",");
				break;
			}
			case "Gender": {
				currentPerson.Gender = e.target.value;
				break;
			}
			case "Features": {
				currentPerson.Features = e.target.value.split(",");
				break;
			}
			case "FavoriteFeature": {
				currentPerson.FavoriteFeature = e.target.value;
				break;
			}
		}

		this.setState({ person: currentPerson });
	}

	async savePerson() {
		const { UserName, FirstName, LastName, MiddleName, Age, AddressInfo, Emails } = this.state.person;
		const personToAdd: Partial<Person> = {
			UserName,
			FirstName,
			LastName,
			MiddleName,
			Age,
			AddressInfo,
			Emails,
		};
		await PeopleDataService.getInstance().create(personToAdd);
		this.setState({ personSaved: true });
	}

	newPerson() {
		this.setState({
			person: {
				AddressInfo: [],
				UserName: "",
				FirstName: "",
				MiddleName: "",
				LastName: "",
				Age: 0,
				Emails: [],
				FavoriteFeature: "",
				Features: [],
				Gender: "",
				HomeAddress: "",
			},
			personSaved: false,
		});
	}

	addAddress() {
		const currentPerson = this.state.person;
		currentPerson.AddressInfo.push({ Address: "", City: { CountryRegion: "", Name: "", Region: "" } });
		this.setState({ person: currentPerson });
	}

	changeAddress(key: string, value: string, index: number) {
		const currentPerson = this.state.person;
		const address = currentPerson.AddressInfo[index];
		switch (key) {
			case "Address": {
				address.Address = value;
				break;
			}
			case "City.Name": {
				address.City.Name = value;
				break;
			}
			case "City.Region": {
				address.City.Region = value;
				break;
			}
			case "City.CountryRegion": {
				address.City.CountryRegion = value;
				break;
			}
		}

		this.setState({ person: currentPerson });
	}

	render() {
		return (
			<div className="submit-form">
				{this.state.personSaved ? (
					<div>
						<h4>Person Added successfully!</h4>
						<button className="btn btn-success" onClick={this.newPerson}>
							Add New
						</button>
					</div>
				) : (
					<div>
						<PersonForm changeHandler={this.changeHandler} person={this.state.person} type={"add"} />
						<button onClick={this.addAddress} className="btn btn-success">
							Add Address
						</button>
						{this.state.person.AddressInfo.map((address, index) => {
							return (
								<>
									<div className="form-group">
										<label htmlFor="title">Address</label>
										<input
											type="text"
											key={index}
											className="form-control"
											id="FavoriteFeature"
											required
											value={address.Address}
											onChange={(e) => this.changeAddress(e.target.name, e.target.value, index)}
											name="Address"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="title">City Name</label>
										<input
											type="text"
											key={index}
											className="form-control"
											id="City.Name"
											required
											value={address.City.Name}
											onChange={(e) => this.changeAddress(e.target.name, e.target.value, index)}
											name="City.Name"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="title">City Region</label>
										<input
											type="text"
											key={index}
											className="form-control"
											id="City.Region"
											required
											value={address.City.Region}
											onChange={(e) => this.changeAddress(e.target.name, e.target.value, index)}
											name="City.Region"
										/>
									</div>
									<div className="form-group">
										<label htmlFor="title">City CountryRegion</label>
										<input
											type="text"
											key={index}
											className="form-control"
											id="CountryRegion"
											required
											value={address.City.CountryRegion}
											onChange={(e) => this.changeAddress(e.target.name, e.target.value, index)}
											name="City.CountryRegion"
										/>
									</div>
									<div>-----------------------------------------</div>
								</>
							);
						})}

						<button onClick={this.savePerson} className="btn btn-success">
							Add{" "}
						</button>
					</div>
				)}
			</div>
		);
	}
}
