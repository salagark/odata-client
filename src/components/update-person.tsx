import { Component, ChangeEvent } from "react";
import { RouteComponentProps } from "react-router-dom";
import { PeopleDataService } from "../services/people.service";
import { Person } from "../types";
import PersonForm from "./person-form";

interface RouterProps {
	// type for `match.params`
	userName: string; // must be type `string` since value comes from the URL
}

interface UpdatePersonProps extends RouteComponentProps<RouterProps> {}

interface UpdatePersonState {
	person: Person;
	updatedPersonKeys: Partial<Person>;
	personUpdated: boolean;
}

export default class UpdatePerson extends Component<UpdatePersonProps, UpdatePersonState> {
	constructor(props: UpdatePersonProps) {
		super(props);
		this.updateHandler = this.updateHandler.bind(this);
		this.updatePerson = this.updatePerson.bind(this);

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
			updatedPersonKeys: {},
			personUpdated: false,
		};
	}

	async componentDidMount() {
		const person = await PeopleDataService.getInstance().get(this.props.match.params.userName);
		this.setState({ person });
	}

	updateHandler(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
		const currentPerson = this.state.person;
		const updateMap = this.state.updatedPersonKeys;
		switch (e.target.name) {
			case "FirstName": {
				currentPerson.FirstName = e.target.value;
				updateMap.FirstName = currentPerson.FirstName;
				break;
			}
			case "MiddleName": {
				currentPerson.MiddleName = e.target.value;
				updateMap.MiddleName = currentPerson.MiddleName;
				break;
			}
			case "LastName": {
				currentPerson.LastName = e.target.value;
				updateMap.LastName = currentPerson.LastName;
				break;
			}
			case "Age": {
				currentPerson.Age = Number(e.target.value);
				updateMap.Age = currentPerson.Age;
				break;
			}
			case "Emails": {
				currentPerson.Emails = e.target.value.split(",");
				updateMap.Emails = currentPerson.Emails;
				break;
			}
		}

		this.setState({ person: currentPerson, updatedPersonKeys: updateMap });
	}

	async updatePerson() {
		await PeopleDataService.getInstance().update(this.props.match.params.userName, this.state.updatedPersonKeys);
		this.setState({ personUpdated: true });
	}

	render() {
		return (
			<div className="submit-form">
				{this.state.personUpdated ? (
					<div>
						<h4>Person Updated successfully!</h4>
					</div>
				) : (
					<div>
						<PersonForm changeHandler={this.updateHandler} person={this.state.person} type={"update"} />
						<button onClick={this.updatePerson} className="btn btn-success">
							Update{" "}
						</button>
					</div>
				)}
			</div>
		);
	}
}
