import { FaBars } from 'react-icons/fa';
import { NavLink as Link } from 'react-router-dom';
import styled from 'styled-components';

import React, { Component } from 'react';
import {connect} from 'react-redux'
import {getAllDatas} from '../../store/Actions/BasicAction';
import axios from '../../config/server.config'
import {
	MDBNavbar,MDBContainer,MDBNavbarBrand,MDBNavbarToggler,MDBIcon,MDBCollapse,showNavColor,MDBNavbarNav,MDBNavbarItem,MDBNavbarLink
} from 'mdb-react-ui-kit';

export const NavLink = styled(Link)`
color: #ffffff;
font-family:Roboto,Helvetica Neue,sans-serif;
font-size: 16px;
display: flex;
align-items: center;
text-decoration: none;
padding: 5px 12px;
height: 100%;
cursor: pointer;
&.active {
	color: white;
	background-color: #0088ff;
}
`;

export const NavItem = styled(MDBNavbarItem)`
padding:5px
`;
export const NavBrand = styled(MDBNavbarBrand)`
color:white;
font:inherit;
font-size:20px;
`;

class Navbar extends Component{
	constructor(props){
		super(props);
	}
	componentDidMount(){
		axios.get('basic/list')
		.then(response => {
			console.log('adfd');
			this.props.initialData(response.data);
		})
		.catch(function (error){
			console.log(error);
		})
	}
	render(){
		return (
			<MDBNavbar  expand='lg'  fixed='top' bgColor='primary'>
				<MDBContainer fluid>
					<NavBrand href='/' style={{marginLeft:'25px'}}>
						ROTA
					</NavBrand>
					<MDBNavbarToggler
						type='button'
						data-target='#navbarColor02'
						aria-controls='navbarColor02'
						aria-expanded='false'
						aria-label='Toggle navigation'
					>
						<MDBIcon icon='bars' fas />
					</MDBNavbarToggler>
					<MDBCollapse navbar>
						<MDBNavbarNav className='me-auto mb-2 mb-lg-0'>
							<NavItem>
								<NavLink aria-current='page' to='basic'>
								Basic
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink aria-current='page' to='assign'>
								Assign
								</NavLink>
							</NavItem>
							<NavItem>
								<NavLink aria-current='page' to='total'>
								Total
								</NavLink>
							</NavItem>
						</MDBNavbarNav>
					</MDBCollapse>
				</MDBContainer>
			</MDBNavbar>
			//  <nav className="navbar fixed-top navbar-expand-sm navbar-white bg-primary">
			// 	<div className="container-fluid">
			// 		<div className="collapse navbar-collapse" id="navbarNav">
			// 			<ul className="navbar-nav">
			// 				<li className="nav-item">
			// 					<NavLink to=''>ROTA SYSTEM</NavLink>
			// 				</li>
			// 				<li className="nav-item">
			// 					<NavLink to='basic'>BASIC</NavLink>
			// 				</li>
			// 				<li className="nav-item">
			// 					<NavLink to='assign'>ROTA</NavLink>
			// 				</li>
			// 				<li className="nav-item">
			// 					<NavLink to='total'>TOTAL</NavLink>
			// 				</li>
			// 			</ul>
			// 		</div>
			// 	</div>
			// </nav>
		)
	}
}

const mapDispatchToProps = (dispatch) => ({
    initialData:(data) =>dispatch(getAllDatas(data)),
});

export default connect(null,mapDispatchToProps)(Navbar)