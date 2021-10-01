import { Component } from "react";
import { Switch, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import SearchPerson from "./components/search-person";
import AddPerson from "./components/add-person";
import PeopleList from "./components/people-list";
import UpdatePerson from "./components/update-person";
import { Person } from "./types";
import { generateEntityKey } from "./utils";
import { PeopleDataService } from "./services/people.service";

interface AppProps {}
interface AppState {
	people: Person[];
}
class App extends Component<AppProps, AppState> {
	constructor(props: AppProps) {
		super(props);
		this.state = {
			people: [],
		};
		this.fetchPeople = this.fetchPeople.bind(this);
		this.deletePerson = this.deletePerson.bind(this);
		PeopleDataService.register(generateEntityKey());
	}

	async componentDidMount() {
		await this.fetchPeople();
	}

	async fetchPeople() {
		const people = await PeopleDataService.getInstance().getAll();
		this.setState({ people });
	}

	async deletePerson(userName: string) {
		await PeopleDataService.getInstance().delete(userName);
		await this.fetchPeople();
	}

	render() {
		return (
			<div>
				<nav className="navbar navbar-expand navbar-dark bg-dark">
					<Link to={"/people"} className="navbar-brand" onClick={this.fetchPeople}>
						Jibble
					</Link>
					<div className="navbar-nav mr-auto">
						<li className="nav-item">
							<Link to={"/people"} className="nav-link" onClick={this.fetchPeople}>
								People
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/search"} className="nav-link">
								Search/Filter
							</Link>
						</li>
						<li className="nav-item">
							<Link to={"/add"} className="nav-link">
								Add
							</Link>
						</li>
					</div>
				</nav>
				<div className="container mt-3">
					<Switch>
						<Route
							exact
							path={["/", "/people"]}
							component={() => <PeopleList people={this.state.people} deletePerson={this.deletePerson} />}
						/>
						<Route exact path="/search" component={SearchPerson} />
						<Route path="/add" component={AddPerson} />
						<Route path="/people/:userName" component={UpdatePerson} />
					</Switch>
				</div>
			</div>
		);
	}
}

export default App;
