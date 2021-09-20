import { Link } from "react-router-dom"
import classes from './team.module.css'
import { useSwipeable } from "react-swipeable"
import ChevronRight from '../../../../assets/icons/chevron-right.svg'
import Cross from '../../../../assets/icons/cross.svg'
import { useState } from "react"
import axios from "axios"
import { API } from "../../../../config"

export default function ListItem (props) {
    const [editing, setEditing] = useState(false)
  const handlers = useSwipeable({
    onSwipedLeft: () => props.index !== 0 && setEditing(true), onSwipedRight: () => props.index !== 0 && setEditing(false),
  });

  const deleteUser = (id) => {
    axios.delete(`${API}user/${id}?access_token=${localStorage.getItem("token")}`).then((res) => {
      console.log(res)
      props.setDeleted(true)
      setEditing(false)
    }).catch((error) => {
      props.setDeleted(true)
      setEditing(false)
    })
  }

  return (<li {...handlers} key={props.user.id} id={props.index}>
  <Link to={`/user/${props.user.id}`} className={`${classes.swipeable} ${editing && classes.editing}`}>
  <span>
      {`${props.user.first_name} ${props.user.last_name}`}
  </span>
  <img src={ChevronRight} className={classes.chevron} alt="Click" />
  </Link>
  <div className={classes.onSwipe}>
      <img className={classes.chevron} src={Cross} alt="delete" onClick={() => deleteUser(props.user.id)} />
  </div>
</li>)
}