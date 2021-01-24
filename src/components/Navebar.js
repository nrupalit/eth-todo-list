import React, { Component } from 'react';

class Navebar extends Component {
  render() {
    return (
      <div className="Navebar">
          <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
            <p className="navbar-brand col-sm-3 col-md-2 mr-0" >Dapp University | Todo List</p>
            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap d-none d-sm-none d-sm-block">
                <small><p className="nav-link" ><span id="account">{this.props.account}</span></p></small>
                </li>
            </ul>
            </nav>
      </div>
    );
  }
}

export default Navebar;