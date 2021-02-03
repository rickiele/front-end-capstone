import React from "react"
import { useContext, useEffect, useState } from "react"
import { useParams, useHistory } from "react-router-dom"
import { Modal, Button, Form } from "react-bootstrap"
import { HabitContext } from "./HabitProvider"
import "bootstrap/dist/css/bootstrap.min.css"
import "./Habit.css"

export const HabitEdit = (props, { habit }) => (
  <Modal
  {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
  >
    <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h5>Habit Stats</h5>
        <p>Date Started: (Timestamp goes here)</p>
        <Form>
          <Form.Group controlId="exampleForm.ControlInput1">
            <Form.Label>
              <h5>Edit Habit Name</h5>
            </Form.Label>
            <Form.Control type="text" placeholder="Edit habit name here" />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button>Delete Habit</Button>
        <Button>Save New Habit Name</Button>
    </Modal.Footer>
  </Modal>
)

export const HabitEditModal = () => {
  // Modal States 
  const [modalShow, setModalShow] = React.useState(false);

  const { getHabitById, deleteHabit } = useContext(HabitContext)
	const [habit, setHabit] = useState({})
  const {habitId} = useParams()
  const history = useHistory()

  useEffect(() => {
    console.log("useEffect", habitId)
    getHabitById(habitId)
    .then((response) => {
      setHabit(response)
    })
  }, [])

  const handleDeleteHabit = () => {
    deleteHabit(habit.id)
    .then(() => {
      history.push("/")
    })
  }

  return (
    <>
      <Button variant="primary" 
        onClick={() => {
            history.push(`/habits/${habit.id}`)
        }} 
        onClick={() => setModalShow(true)} className="habits__editHabitBtn">
        Edit Habit 
      </Button>

      <HabitEdit
        show={modalShow}
        onHide={() => setModalShow(false)}
        key={habit.id}
        habit={habit}
      />

    </>
  );
}