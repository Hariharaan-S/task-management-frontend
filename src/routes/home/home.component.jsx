import Task from '../../components/task/task.component';
import { useContext, useEffect, useState } from 'react';
import { TaskContext } from '../../context/taskContext';
import { TaskCount, PastTask } from './home.styles';
import { putTasks } from '../../utilities/pastTask.utility';
import { UserContext } from '../../context/user.context';
import { TaskWrapper } from '../../components/task/tasks.styles';

const Home = () => {
    const { currentUser } = useContext(UserContext)
    const { tasks } = useContext(TaskContext)
    const [contextTask, setContextTask] = useState([]);
    const [pastTasks, setPastTasks] = useState([])
    const [tasksDone, setTasksDone] = useState([]);
    const [total, setTotal] = useState(0)
    const [doneTasks, setDoneTasks] = useState(0)
    const [dueTasks, setDueTasks] = useState(0)

    useEffect(() => {
        setContextTask(tasks);
    }, [tasks])

    useEffect(() => {
        if (currentUser != null && contextTask != null && contextTask.length > 0) {
            const temp_tasks = contextTask.filter(task => Date.now() > task.due_date)
            temp_tasks.forEach(task => {
                putTasks(task);
            })
        }
    }, [currentUser, tasks, contextTask])

    useEffect(() => {
        const getPastTasks = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_TASK_URL + '/getduepasttasks', {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            if (response.status === 200) {
                const res = await response.json()
                setPastTasks(res.message)
            }
        }
        const getTasksDone = async () => {
            const response = await fetch(process.env.REACT_APP_BASE_TASK_URL + '/getdonetasks', {
                method: "POST",
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(currentUser)
            })
            if (response.status === 200) {
                const res = await response.json()
                setTasksDone(res.message)
            }
        }
        if (currentUser) {
            getPastTasks();
            getTasksDone();
        }
    }, [currentUser])

    useEffect(() => {
        if (tasks != null) {
            setDueTasks(tasks.length);
        }
    }, [contextTask, tasks]);

    useEffect(() => {
        pastTasks && tasksDone && setDoneTasks(pastTasks.length + tasksDone.length);
    }, [pastTasks, tasksDone]);

    useEffect(() => {
        setTotal(dueTasks + doneTasks);
    }, [dueTasks, doneTasks]);


    return (
        <div>
            <TaskCount>
                <PastTask colorindex={0}>
                    <h2>{total}</h2>
                    <p>Total Tasks created</p>

                </PastTask>
                <PastTask colorindex={1}>
                    <h2>{doneTasks}</h2>
                    <p>Tasks Done</p>

                </PastTask>
                <PastTask colorindex={2}>
                    <h2>{dueTasks}</h2>
                    <p>Tasks due past</p>

                </PastTask>
            </TaskCount>
            <h2>Upcoming Tasks</h2>
            <TaskWrapper>

                {tasks && tasks.length > 0 ? (tasks.map(task => (
                    <Task option={task} key={task.task_id} />
                ))) : (
                    <p>No Upcoming Tasks</p>
                )}
            </TaskWrapper>
            <h2>Past Tasks</h2>
            <TaskWrapper>


                {pastTasks && pastTasks.length > 0 ? (
                    pastTasks.map(task => (
                        <Task past={true} option={task} />
                    ))
                ) : (
                    <p>No past tasks available.</p>
                )}
            </TaskWrapper>
            <h2>Tasks Done</h2>
            <TaskWrapper>

                {tasksDone && tasksDone.length > 0 ? (tasksDone.map(task => (
                    <Task option={task} done={true} key={task.task_id} />
                ))) : (
                    <p>No Tasks done</p>
                )}
            </TaskWrapper>

        </div>
    )
}

export default Home;