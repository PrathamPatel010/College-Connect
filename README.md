## Objective:
The goal is to develop a full-stack web-based messaging platform exclusive to college students. This platform will facilitate anonymous and real-time communication, ensuring privacy and security. The system will be designed to be maintainable and scalable to accommodate the growing user base.

### Functional Requirements:
Note: [V2] - Denotes that these features are for future enhancement.

- Users should be able to register and log in using their college email addresses to maintain exclusivity. During signup, users should be able to provide their name, email, and password.
    - Optionally, users can upload their profile picture.
- Users should be able to engage in real-time messaging using socket.io for immediate message updates.
- Users should see a typing indicator when the person they are chatting with is typing.
- Each user should be able to view each other's profile picture.
- Users should receive notifications for new messages.
- Users should have the ability to create group conversations.
    - Only users with admin rights should be able to add new people to the group, remove people from the group, and change the name of the group.
    - By default, the person who creates the group will be the admin.
- User credentials (i.e., passwords) should be stored in a hashed form using Argon2 to ensure security.
- [V2] Only users with verified account should be able access the chats.
    - Account verification should be done using Email Service.
- [V2] All the messages should be end-to-end encrypted. All messages in the database should be encrypted.
- [V2] Users should be able to send attachments.

### Non-Functional Requirements:
- The system should be capable of scaling to handle increased traffic as the user base grows.
- We need to implement robust security measures to protect user data and communication.
- We need to ensure the system handles real-time data efficiently without delays.
- User interface should be clean and intuitive.

### Capacity Estimation:
- **Storage:** Initial setup to handle data for up to 10,000 users with scope for expansion.
- **Traffic:** System designed to handle up to 1000 concurrent users initially with the ability to scale.

### Choosing Database:
Based on our requirements for complex relationships, scalability, and support for ACID transactions, We can use PostgresSQL.
PostgreSQL's strong support for relational data structures and its capability for horizontal scalability through clustering and partitioning make it ideal for our application.

### Tech Stack:
- **Backend:** TypeScript with Node.js and Express.js
- **Database:** PostgresSQL with Prisma ORM
- **Real-Time Communication:** Socket.io
- **Frontend:** React Typescript
- **Styling:** Tailwind CSS, shadcn/ui

### High-Level Design Diagram
<img src="./Design_Diagram_MK2.png" alt="high-level-design-image">