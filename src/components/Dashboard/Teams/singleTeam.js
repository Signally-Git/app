import { Link } from "react-router-dom"
import classes from './teams.module.css'
import { useSwipeable } from "react-swipeable"
import ChevronRight from '../../../assets/icons/chevron-right.svg'
import Cross from '../../../assets/icons/cross.svg'
import { useState } from "react"
import axios from "axios"
import { API } from "../../../config"

export default function SingleTeam(props) {
  const [editing, setEditing] = useState(false)
  const handlers = useSwipeable({
    onSwipedLeft: () => setEditing(true), onSwipedRight: () => setEditing(false),
  });

  const deleteTeam = (id) => {
    axios.delete(`${API}team/${id}?access_token=${localStorage.getItem("token")}`).then((res) => {
      setEditing(false)
      props.deleted(true)
    })
  }

  return (<li {...handlers} key={props.team.id} id={props.index}>
    <Link to={`/team/${props.team.id}`} className={`${props.team.signature_template ? classes.active : classes.inactive} ${classes.swipeable} ${editing && classes.editing}`}>
      {props.team.name} ({props.team.members_count})<img src={ChevronRight} className={classes.chevron} alt="Click" />
    </Link>
    <div className={classes.onSwipe}>
      <img className={classes.chevron} src={Cross} alt="delete" onClick={() => deleteTeam(props.team.id)} />
    </div>
  </li>)
}