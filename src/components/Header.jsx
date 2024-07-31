import { FilterVerticalIcon, ArrowRight02Icon, Search01Icon } from "hugeicons-react"
import { useState } from 'react'; 

import '../styles/components/Header.scss'
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export function Header(){
    const [search, setSearch] = useState(''); 
    const navigate = useNavigate(); 

    const handleSubmit = (e) => {
        console.log(e.target.value)
        e.preventDefault(); 

        if(!search) return; 

        navigate(`search?q=${search}`);
        setSearch(""); 

    }
    
    return(
        <>
        <h1 id = "app-name">
            <NavLink  to = '/'
            activeClassName = "active">
                yaMeal
            </NavLink>
        </h1>
        <div className="Header">
    
            <form onSubmit = {handleSubmit}
            id="search-bar">
                <input
                type="text"
                onChange = {(e) => setSearch(e.target.value)}
                value = {search}
                placeholder = "Search recipes..."
                />
                <button type = "submit">
                    <Search01Icon/>
                </button>
            </form>

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