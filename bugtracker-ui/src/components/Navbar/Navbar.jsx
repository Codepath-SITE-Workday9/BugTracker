import * as React from "react";
import { useState } from "react";
import "./Navbar.css";

export default function Navbar({ isOpen }) {
    console.log("Navbar isopen below")
    console.log(isOpen)

    return (
        <div className="navbar">

        <div className="navbar-content">
            {/*}
            <ul class="navbar-nav mr-auto">
                <li><a href="javascript:" class="full-screen" onclick="javascript:toggleFullScreen()"><i class="feather icon-maximize"></i></a></li>
                <li class="nav-item dropdown">
                    <a class="dropdown-toggle" href="javascript:" data-toggle="dropdown" aria-expanded="false">Dropdown</a>
                    <ul class="dropdown-menu">
                        <li><a class="dropdown-item" href="javascript:">Action</a></li>
                        <li><a class="dropdown-item" href="javascript:">Another action</a></li>
                        <li><a class="dropdown-item" href="javascript:">Something else here</a></li>
                    </ul>
                </li>
                <li class="nav-item">
                    <div class="main-search">
                        <div class="input-group">
                            <input type="text" id="m-search" class="form-control" placeholder="Search . . ."/>
                            <a href="javascript:" class="input-group-append search-close">
                                <i class="feather icon-x input-group-text"></i>
                            </a>
                            <span class="input-group-append search-btn btn btn-primary">
                                <i class="feather icon-search input-group-text"></i>
                            </span>
                        </div>
                    </div>
                </li>
            </ul>
            */}
            <div className={isOpen ? "navbar-left-open" : "navbar-left-closed"}>
                <h>DASHBOARD</h> 
            </div>

            <div className="navbar-right">
                <span className="material-symbols-outlined">circle_notifications</span> {/* TODO: Add menus for both icons */}
                <span className="material-symbols-outlined">account_circle</span>
            </div>
        </div>
    </div>


    )
}