
export const putTasks = async (task) => {
    await fetch('http://localhost:5000/past', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ payload: task })
    }).catch(error => {
        console.error("Error fetching tasks:", error);
    });
}