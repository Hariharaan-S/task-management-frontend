import { createContext, useState, useEffect, useContext } from "react";
import { UserContext } from "./user.context";


export const TaskContext = createContext({
    tasks: [],
    setTasks: () => { }
});


export const TaskProvider = ({ children }) => {
    const [tasks, setTasks] = useState([]);
    const { currentUser } = useContext(UserContext)

    useEffect(() => {
        const getTasks = async () => {
            await fetch(process.env.REACT_APP_BASE_URL + '/get/tasks', {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            }).then(res => res.json()
            ).then(res => {
                setTasks(res.message);
            }).catch(error => {
                console.error("Error fetching tasks:", error);
            });
        }
        if (currentUser != null) {
            getTasks();
        }
    });

    return (
        <TaskContext.Provider value={{ tasks, setTasks }}>
            {children}
        </TaskContext.Provider>
    );
};
