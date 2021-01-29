/* Purpose: Data for habits, adding, editing, and deleting habits.
 */
import React, { useState, createContext } from "react"

export const HabitContext = createContext()

export const HabitProvider = (props) => {
    const [habits, setHabits] = useState([])

    const getHabits = () => {
        return fetch("http://localhost:8088/habits")
        .then(res => res.json())
        .then(setHabits)
    }

    const addHabit = habitObj => {
        return fetch("http://localhost:8088/habits", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(habitObj)
        })
        .then(getHabits)
    }

    return (
        <HabitContext.Provider value={{
            habits, getHabits, addHabit
        }}>
            {props.children}
        </HabitContext.Provider>
    )
}