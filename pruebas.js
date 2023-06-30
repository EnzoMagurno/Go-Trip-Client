await fetch("http://localhost:3001/user/readUser", {
    method: "GET",
    headers: {
        "Authorization": `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDA1ZWRiYS0yYWEzLTQ5ODAtYjg2NS05NWU3NDg0NDgzZmUiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2ODc5MjMzMzcsImV4cCI6MTY4NzkzMDUzN30.Ojmdyqp2WCXcttVwJYRd84Lxz0LjXytOcgjuC6jxVNo`
    }
})
.then(response => response.json())
.then(data => console.log(data))