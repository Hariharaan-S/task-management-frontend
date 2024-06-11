
export const putTasks = async (task) => {
    await fetch(process.env.REACT_APP_BASE_URL + 'past', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload: task })
    }).catch(error => {
        console.error("Error fetching tasks:", error);
    });
}