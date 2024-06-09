import { Outlet, useNavigate } from "react-router";
import AddIcon from '@mui/icons-material/Add';
import { PopupBody } from '../../components/task/tasks.styles'
import { Unstable_Popup as BasePopup } from '@mui/base/Unstable_Popup';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavigationWrapper, NavigationBar, ButtonBar, Button, Time } from "./navigation.styles";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../context/user.context";
import { TaskContext } from "../../context/taskContext";

const Navigation = () => {
    const { currentUser, setCurrentUser } = useContext(UserContext)
    const { setTasks } = useContext(TaskContext)
    const navigate = useNavigate()
    const [currDate, setDate] = useState(null)
    const [currTime, setTime] = useState(null)
    useEffect(() => {
        setDate(new Date().toDateString());
        setInterval(() => {
            setTime(new Date().toLocaleTimeString());
        }, 1000)

    }, [currDate, currTime])

    const [anchor, setAnchor] = useState(null);

    const handleClick = (event) => {
        setAnchor(anchor ? null : event.currentTarget);
    };

    const handleLogOut = () => {
        setCurrentUser(null);
        setTasks([]);
    }

    const handleNavigate = () => {
        if (currentUser) {
            navigate('/create')
        } else {
            navigate('/auth')
        }
    }

    const open = Boolean(anchor);
    const id = open ? 'simple-popper' : undefined;

    return (

        <NavigationWrapper>
            <NavigationBar>
                <h1>TaskFlow</h1>
                <Time>{currDate + " " + currTime}</Time>
                <ButtonBar>
                    <Button onClick={handleNavigate}><AddIcon className="icon" /></Button>

                    {
                        !currentUser ? (<Button onClick={() => navigate('/auth')}><AccountCircleIcon className="icon" /></Button>) : (
                            <>
                                <Button aria-describedby={id} type="button" onClick={handleClick}><AccountCircleIcon className="icon" /></Button>
                                <div className="pop-up">
                                    {
                                        currentUser && <BasePopup id={id} open={open} anchor={anchor}>
                                            <PopupBody>
                                                <h1>{currentUser.displayName}</h1>
                                                <h3>{currentUser.email}</h3>
                                                <Button onClick={handleLogOut}>Log Out</Button>
                                            </PopupBody>
                                        </BasePopup>
                                    }

                                </div>
                            </>

                        )

                    }
                </ButtonBar>
            </NavigationBar>
            <Outlet />
        </NavigationWrapper>


    )
}

export default Navigation;