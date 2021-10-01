import { ChangeEvent, Component } from "react";
import { Person } from "../types";

interface PersonFormProps {
	person: Person;
	changeHandler: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
	type: string;
}

interface PersonFormState {}

export default class PersonForm extends Component<PersonFormProps, PersonFormState> {
	constructor(props: PersonFormProps) {
		super(props);

		this.state = {
			selectedPerson: null,
			index: -1,
		};
	}

	render() {
		const { UserName, FirstName, MiddleName, LastName, Age, Emails } = this.props.person;

		return (
			<>
				{this.props.type === "add" && (
					<div className="form-group">
						<label htmlFor="title">UserName</label>
						<input
							type="text"
							className="form-control"
							id="UserName"
							required
							value={UserName || ""}
							onChange={this.props.changeHandler}
							name="UserName"
						/>
					</div>
				)}

				<div className="form-group">
					<label htmlFor="title">FirstName</label>
					<input
						type="text"
						className="form-control"
						id="FirstName"
						required
						value={FirstName || ""}
						onChange={this.props.changeHandler}
						name="FirstName"
					/>
				</div>

				<div className="form-group">
					<label htmlFor="title">MiddleName</label>
					<input
						type="text"
						className="form-control"
						id="MiddleName"
						required
						value={MiddleName || ""}
						onChange={this.props.changeHandler}
						name="MiddleName"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">LastName</label>
					<input
						type="text"
						className="form-control"
						id="LastName"
						required
						value={LastName || ""}
						onChange={this.props.changeHandler}
						name="LastName"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">Age</label>
					<input
						type="text"
						className="form-control"
						id="Age"
						required
						value={Age || ""}
						onChange={this.props.changeHandler}
						name="Age"
					/>
				</div>
				<div className="form-group">
					<label htmlFor="title">Emails</label>
					<input
						type="text"
						className="form-control"
						id="Emails"
						required
						value={Emails || []}
						onChange={this.props.changeHandler}
						name="Emails"
					/>
				</div>
			</>
		);
	}
}
