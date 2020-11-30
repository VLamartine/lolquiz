import React from 'react';
import Button from '../../Button';
import classes from './Sidebar.module.css';
const Sidebar = ({toggleGamemode, open}) => {

  const sidebarClasses = [classes.sidebar];

  sidebarClasses.push(open ? classes.open : classes.close)
  return (
    <div className={sidebarClasses.join` `}>
      <ul className={classes.list}>
        <li className={classes.list_item}>
          <Button click={() => toggleGamemode("pick")} classes={classes.button}>Campeão por fala de seleção</Button>
        </li>
        <li className={classes.list_item}>
          <Button click={() => toggleGamemode("ban")} classes={classes.button}>Campeão por fala de banimento</Button>
        </li>
        <li className={classes.list_item}>
          <Button click={() => toggleGamemode("champion")} classes={classes.button}>Campeão por nome da habilidade</Button>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar;