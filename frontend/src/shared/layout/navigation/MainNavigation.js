import React, { useState } from "react";
import { Link } from "react-router-dom";
import { SideDrawer, NavLinks, MainHeader } from "shared/layout";
import { Backdrop } from "shared/components";

const MainNavigation = () => {
	const [drawerIsOpen, setDrawerIsOpen] = useState(false);

	const handleOpenDrawer = () => {
		setDrawerIsOpen(true);
	};

	const handleCloseDrawer = () => {
		setDrawerIsOpen(false);
	};

	return (
		<React.Fragment>
			{drawerIsOpen && <Backdrop onClick={handleCloseDrawer} />}

			<SideDrawer show={drawerIsOpen} onClick={handleCloseDrawer}>
				<nav className="main-navigation__drawer-nav">
					<NavLinks />
				</nav>
			</SideDrawer>

			<MainHeader>
				<button
					className="main-navigation__menu-btn"
					onClick={handleOpenDrawer}
				>
					<span />
					<span />
					<span />
				</button>
				<h1 className="main-navigation__title">
					<Link to="/">Your Places</Link>
				</h1>

				<nav className="main-navigation__header-nav">
					<NavLinks />
				</nav>
			</MainHeader>
		</React.Fragment>
	);
};

export default MainNavigation;
