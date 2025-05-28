# To-Do Vite App

Full-stack To-Do application built with **React + TypeScript + Vite** (frontend) and **Spring Boot 3.5.0** with **H2 Database** (backend).  
The backend requires **Java 21**.

## Features

- List, Add, Edit, Mark as complete & Delete
- Filter tasks
- Responsive design with dark/light mode(Partially done)
- API integration with Axios
- Mobile-friendly

---

## Frontend

- **Tech:** React, TypeScript, Vite, Tailwind CSS, Axios
- **Location:** `/todoapiLGTestTodoProject/lg-todo-vite-app2/`
- **Start:**  
  ```bash
  npm install
  npm run dev
  ```

## Backend

- **Tech:** Spring Boot 3.5.0, H2 Database (in-memory)
- **Java version required:** 21
- **Location:** `/todoapi`
- **Start:**  
  - .\mvnw spring-boot:run

---

## API

- The frontend expects the backend API at:  
  `http://localhost:8080/api/tasks`

---

## Notes

- The backend uses H2, so data is **not persisted** after restart.
- Make sure Java 21 is installed for the backend.
- You can change the API URL in `src/api/todoApi.ts` if needed.
- **Please contact me ASAP if something isn't working!!!**
- A postman collection is included to test the BE if needed

---

## License

Provided for evaluation purposes only.