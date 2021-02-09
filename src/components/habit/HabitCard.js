/* PURPOSE: Individual Habit Card */

import React, { useContext, useEffect, useState } from "react"
import { useHistory, Link } from "react-router-dom" 
import { Button, Card, Col, Row } from "react-bootstrap"
import { HabitContext } from "./HabitProvider"
import { HabitActionsContext } from "./HabitActionTakenProvider"
import { HabitProgress } from "./HabitProgress"
import { HabitEditModal } from './HabitEditModal'
import "./Habit.css"

export const HabitCard = ({ habit }) => {

	/* Context for Habits and Habit Actions Taken */
	const { getHabits } = useContext(HabitContext)
	const { getHabitActions, addHabitAction, habitActions, deleteHabitActions } = useContext(HabitActionsContext)
		
	/* Get the Habits and the Habit Actions Taken */
	useEffect(() => {
		getHabits()
		.then(getHabitActions())
	}, [])
		
	/* Track Habit - ON CLICK */
	const timestamp = Date.now()
	const habitActionTimestamp = new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit', day: '2-digit' }).format(timestamp)
	const [isLoading, setIsLoading] = useState(true);
	const history = useHistory();

	const handleTrackHabit = () => {
    setIsLoading(true);
      //POST - add
      addHabitAction ({
          habitId: habit.id,
          timestamp: habitActionTimestamp
      })
      .then(() => history.push("/"))
  }

	
	/* totalHabitActions = number of times a habit has been tracked */
	const matchHabit = habitActions.find((habitObj) => habitObj.id ===  habit.id)
	const habitActionArray = matchHabit?.habitActionTaken
	const totalHabitActions = habitActionArray?.length
	
	
	/* Delete habit actions array for habit */
	const handleDeleteHabitActions = () => {
		deleteHabitActions(habit.id)
  }
	

	/* habitActionArray?.forEach(element => console.log(element)) */
	//  console.log(habitActionArray, "what is this")
	/* 
	for (const habitActionObj of habitActionArray) {
			handleDeleteHabitActions(habitActionObj.id)
		}
	*/
	
	/* Get Reward Button -- On Click */
	const getRewardButton = () => {
		history.push(`/huzzah/${habit.id}`)
	}


	/* Render the habit cards and progress bars */ 
	return (
  <Card className="habits mb-3 " style={{ color: "#000"}}>

		<Row>
			<Col className="habit__left">
				<Card.Body>
					<Card.Title className="habit__name">
						<h3>{habit.name}</h3>
					</Card.Title>
				</Card.Body>
			</Col>
			<Col className="habit__right">
				{/* Show the Get Reward btn or Track Habit btn */}
				{totalHabitActions === 7 ? 
				<> 
				<Button className="habit__getRewardBtn" onClick={getRewardButton}>
						Get Reward 
				</Button> 
					
				</> : 
				<> 
				<Button className="habit__trackHabitBtn" onClick={event => {
						event.preventDefault()
						handleTrackHabit()}} >
							Track Habit</Button> 
				</>}
			</Col>
					<HabitEditModal key={habit.id} habit={habit}/>
		</Row>

		<Row>
			<Col>
				<HabitProgress key={habit.id} habit={habit}/>
			</Col>
		</Row>
  </Card>
	)
}
