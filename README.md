# Project

### Create a node.js backend with express which allows you to manage a task list. The backend must have the following endpoints

    - retrieve the list of all tasks
    - retrieve the list of all undone tasks
    - Add a new task
    - Mark a task as done
    - Edit an existing task
    - delete a task (bonus)  

First, the tasks can be stored in a global variable.

However, the tasks will then have to be stored in the database. The backend must therefore be connected to the database.

To carry out the project, I created a database named "exolce", then I created a "tasks" table with the field:
id PK not null auto increment, name varchar(255), isDone boolean.
It is not required to set up a frontend, therefore for the tests I used Postman.

