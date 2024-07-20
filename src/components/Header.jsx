import { FilterVerticalIcon, ArrowRight02Icon, Search01Icon } from "hugeicons-react"
import { useState } from 'react'; 

import '../styles/components/Header.scss'
import { NavLink, Outlet } from "react-router-dom";

export function Header(){
    const [input, setInput] = useState(''); 
    
    return(
        <>
        <h1 id = "app-name">
            <NavLink  to = '/'
            activeClassName = "active">
                Mealsz
            </NavLink>
        </h1>
        <div className="Header">
    
            <div id="search-bar">
                <input
                type="text"
                value = {input}
                onChange = {(e) => setInput(e.target.value)}
                placeholder = "Search recipes..."
                />
                <Search01Icon />
            </div>

            <div className="filter">
                <FilterVerticalIcon />
                <button id="go-premium">
                    <span>Premium</span>
                    <ArrowRight02Icon />
                </button>
            </div>

            
        </div>
        <Outlet />
        </>
    )
}