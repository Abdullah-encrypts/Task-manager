const SenderEmailAPI =
  eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9
    .eyJhdWQiOiIxIiwianRpIjoiMGJlM2RjMGM1YWQzYWY5OWM2NTI4YjQ3MDMyZWQyMjVhMGYxMmU4NGYzYjZkZWVkM2IyYjVjZjhjYzgzNWE5MmQ5NmY1ZDlmYzdlNTgxZjMiLCJpYXQiOiIxNzIyNzcwODg2LjkxMDMyMCIsIm5iZiI6IjE3MjI3NzA4ODYuOTEwMzI1IiwiZXhwIjoiMTcyMzM3NTY4Ni45MDc5MDciLCJzdWIiOiI5MDAxNzMiLCJzY29wZXMiOltdfQ
    .bxcuyq6qCo3kDvtI9m_g_DAm1wiK3ljjJ1sgJZBXNMMMRAUy8zHnxSykAmBbrPGa0dTugUsm90GIJSsEi1E2sg;

    let url = "https://api.sender.net/v2/campaigns/";

    let headers = {
        "Authorization": `Bearer ${SenderEmailAPI}`,
        "Content-Type": "application/json",
        "Accept": "application/json",
    };
    
    fetch(url, {
        method: "GET",
        headers,
    }).then(response => response.json());