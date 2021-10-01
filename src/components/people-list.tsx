import { Component } from "react";
import { Link } from "react-router-dom";
import { Person } from "../types";

interface PeopleProps {
	people: Person[];
	deletePerson: (userName: string) => void;
}

interface PeopleState {
	selectedPerson: Person | null;
	index: number;
}

export default class PeopleList extends Component<PeopleProps, PeopleState> {
	constructor(props: PeopleProps) {
		super(props);
		this.selectPerson = this.selectPerson.bind(this);

		this.state = {
			selectedPerson: null,
			index: -1,
		};
	}

	selectPerson(person: Person, index: number) {
		this.setState({
			selectedPerson: person,
			index,
		});
	}

	render() {
		const { selectedPerson, index } = this.state;

		const { people } = this.props;

		return (
			<div className="list row">
				{people.length === 0 ? (
					<div>
						<br />
						<p>No People Data to display</p>
					</div>
				) : (
					<>
						<div className="col-md-6">
							<h4>People List</h4>

							<ul className="list-group">
								{people &&
									people.map((person: Person, idx: number) => (
										<li
											className={"list-group-item " + (idx === index ? "active" : "")}
											onClick={() => this.selectPerson(person, idx)}
											key={idx}
										>
											{person.FirstName}
										</li>
									))}
							</ul>
						</div>
						<div className="col-md-6">
							{selectedPerson ? (
								<div>
									<h4>Person</h4>
									<div>
										<label>
											<strong>UserName:</strong>
										</label>{" "}
										{selectedPerson.UserName}
									</div>
									<div>
										<label>
											<strong>FirstName:</strong>
										</label>{" "}
										{selectedPerson.FirstName}
									</div>
									<div>
										<label>
											<strong>LastName:</strong>
										</label>{" "}
										{selectedPerson.LastName}
									</div>
									<div>
										<label>
											<strong>MiddleName:</strong>
										</label>{" "}
										{selectedPerson.MiddleName}
									</div>
									<div>
										<label>
											<strong>Age:</strong>
										</label>{" "}
										{selectedPerson.Age}
									</div>
									<div>
										<label>
											<strong>Gender:</strong>
										</label>{" "}
										{selectedPerson.Gender}
									</div>
									<div>
										<label>
											<strong>Emails:</strong>
										</label>{" "}
										{selectedPerson.Emails.join(", ")}
									</div>
									<div>
										<label>
											<strong>Features:</strong>
										</label>{" "}
										{selectedPerson.Features.join(", ")}
									</div>
									<div>
										<label>
											<strong>FavoriteFeature:</strong>
										</label>{" "}
										{selectedPerson.FavoriteFeature}
									</div>{" "}
									<div>
										<label>
											<strong>----------Address Informations-------------</strong>
										</label>{" "}
									</div>
									{selectedPerson.AddressInfo &&
										selectedPerson.AddressInfo.map((address) => {
											return (
												<>
													<div>
														<label>
															<strong>Address:</strong>
														</label>{" "}
														{address.Address}
													</div>
													<div>
														<label>
															<strong>City:</strong>
														</label>{" "}
														{address.City.Name}
													</div>
													<div>
														<label>
															<strong>Region:</strong>
														</label>{" "}
														{address.City.Region}
													</div>
													<div>
														<label>
															<strong>Country Region:</strong>
														</label>{" "}
														{address.City.CountryRegion}
													</div>
													<div>
														<label>
															<strong>-----------------------</strong>
														</label>{" "}
													</div>
												</>
											);
										})}
									<button
										className="btn btn-outline-secondary"
										type="button"
										onClick={() => this.props.deletePerson(selectedPerson.UserName)}
									>
										Delete
									</button>
									<Link to={"/people/" + selectedPerson.UserName} className="badge badge-warning">
										Edit
									</Link>
								</div>
							) : (
								<div>
									<br />
									<p>Please click on a Person...</p>
								</div>
							)}
						</div>
					</>
				)}
			</div>
		);
	}
}
