import { Component, ChangeEvent } from "react";
import { PeopleDataService } from "../services/people.service";
import { Person } from "../types";
import PeopleList from "./people-list";

interface SearchPersonProps {}

interface SearchPersonState {
	filteredPeople: Person[];
	searchBy: string;
	searchTerm: string;
}

export default class SearchPerson extends Component<
	SearchPersonProps,
	SearchPersonState
> {
	constructor(props: SearchPersonProps) {
		super(props);
		this.selectSearchBy = this.selectSearchBy.bind(this);
		this.onChangeSearchSearchTerm =
			this.onChangeSearchSearchTerm.bind(this);
		this.filterPeople = this.filterPeople.bind(this);

		this.state = {
			searchBy: "",
			searchTerm: "",
			filteredPeople: [],
		};
	}

	selectSearchBy(e: ChangeEvent<HTMLSelectElement>) {
		this.setState({ searchBy: e.target.value });
	}

	onChangeSearchSearchTerm(e: ChangeEvent<HTMLInputElement>) {
		this.setState({ searchTerm: e.target.value });
	}

	async filterPeople() {
		const data = await PeopleDataService.getInstance().filter({
			filterBy: this.state.searchBy,
			value: this.state.searchTerm,
		});
		this.setState({ filteredPeople: data });
	}

	render() {
		return (
			<>
				<div className="list row">
					<div className="col-md-8">
						<div className="input-group mb-3">
							<select
								onChange={
									this
										.selectSearchBy
								}
								value={
									this
										.state
										.searchBy
								}
							>
								<option
									key={0}
									value={
										""
									}
								>
									{"None"}
								</option>
								<option
									key={1}
									value={
										"FirstName"
									}
								>
									{
										"First Name"
									}
								</option>
								<option
									key={2}
									value={
										"UserName"
									}
								>
									{
										"User Name"
									}
								</option>
								<option
									key={3}
									value={
										"MiddleName"
									}
								>
									{
										"Middle Name"
									}
								</option>
								<option
									key={4}
									value={
										"LastName"
									}
								>
									{
										"Last Name"
									}
								</option>
								<option
									key={5}
									value={
										"Gender"
									}
								>
									{
										"Gender"
									}
								</option>
								{/* <option key={1} value={'UserName'}>{'User Name'}</option>
							<option key={1} value={'UserName'}>{'User Name'}</option> */}
							</select>
							<input
								type="text"
								className="form-control"
								placeholder={`Search/Filter by ${this.state.searchBy}`}
								value={
									this
										.state
										.searchTerm
								}
								onChange={
									this
										.onChangeSearchSearchTerm
								}
							/>
							<div className="input-group-append">
								<button
									className="btn btn-outline-secondary"
									type="button"
									onClick={
										this
											.filterPeople
									}
								>
									Search/Filter
								</button>
							</div>
						</div>
					</div>
				</div>
				<PeopleList
					people={this.state.filteredPeople}
					deletePerson={() => {}}
				></PeopleList>
			</>
		);
	}
}
