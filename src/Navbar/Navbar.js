import React from 'react';
import { IconContext } from 'react-icons';
import { FaBars } from 'react-icons/fa'
import classes from './Navbar.module.css';

import Sidebar from './Sidebar/Sidebar';
import Backdrop from '../Backdrop/Backdrop';

import Button from '../Button';

const Navbar = ({sidebar, gamemode, score}) => {
  return (
    <nav className={classes.navbar}>
      <div className={classes.mobile}>
        <button className={classes.navbar_button} onClick={() => sidebar.toggle(true)}>
          <IconContext.Provider value={{size: "2rem",  className: classes.navbar_menu, color: "purple"}}>
            <FaBars />
          </IconContext.Provider>
        </button>
        <Sidebar open={sidebar.show} toggleGamemode={gamemode.toggle}></Sidebar>    
        {sidebar.show ?
          (
            <Backdrop click={() => sidebar.toggle(false)}></Backdrop>
          ) : null
        }
      </div>
    
      <div className={classes.desktop}>
      
        <Button
          click={() => gamemode.toggle("pick")} 
          classes={[classes.nav_button, gamemode.name === "pick" ? classes.active : ''].join` `}
        >
          Campeão por fala de seleção
        </Button>

        <Button 
          click={() => gamemode.toggle("ban")} 
          classes={[classes.nav_button, gamemode.name === "ban" ? classes.active : ''].join` `}
        >
          Campeão por fala de banimento
        </Button>

        <Button 
          click={() => gamemode.toggle("champion")} 
          classes={[classes.nav_button, gamemode.name === "champion" ? classes.active : ''].join` `}
        >
          Campeão por nome da habilidade
        </Button> 
      </div>
      <div className={classes.score}>Score: {score}</div>
    </nav>
  )
}

export default Navbar;