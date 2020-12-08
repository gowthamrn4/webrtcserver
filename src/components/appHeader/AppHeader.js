// Libs & utils
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// Assets
import logo from '../../assets/logo_white.svg'

// CSS
import './AppHeader.css'

// Components
import SearchBar from '../searchBar/SearchBar'

export default class AppHeader extends Component {
	static propTypes = {
		search: PropTypes.object.isRequired,
		user: PropTypes.object.isRequired,
		toggleSearch: PropTypes.func.isRequired,
		handleSearch: PropTypes.func.isRequired,
		router: PropTypes.object.isRequired,
	}

	/**
	 * Navigate to the homepage using react-router
	 */
	navigateToHomePage = () => {
		this.props.router.push('/')
	}

	/**
	 * Conditionally render a search button
	 * @param bool
	 * @returns {*}
	 */
	renderSearchButton = (bool) => {
		return bool ? (
			<li>
				<span className="btn btn-icon fa fa-search" onClick={this.props.toggleSearch} />
			</li>
		) : null
	}

	render() {
		const { search, handleSearch, user } = this.props

		return (
			<div className="app-header">
				<div className="g-row">
					<div className="g-col">
						<ul className="header-actions">
							{this.renderSearchButton(user.userName)}
						</ul>

					</div>
				</div>

				<div className="g-row">
					<div className="g-col">
						<SearchBar
							search={search}
							handleSearch={handleSearch}
						/>
					</div>
				</div>

			</div>
		)
	}
}