# inventory-application

📝 Notes: This project relies on having a PostgreSQL database to pull information from. It takes information from two tables, one for manufacturers and one for models. If forking this repository you'll need to set up an environment variable in a .env file for the connection string to your own local database.

⛰️ Objective: The objective of this project was to create an Express inventory application where users can create categories and items to go within the categories. Users must be able to interact with the database through all CRUD methods (Create, Read, Update and delete items and categories). Destructive methods like updating and deleting needed to have a level of protection through an admin password, though creating admin accounts and authentication was outside the scope of the project so this has been implemented on a basic level.

⚙️ Technologies Used: HTML, CSS, JavaScript, Node.js, Express, EJS, PostgreSQL

A live version of the project can be found here. Hosted by Railway: https://inventory-application-production-6eff.up.railway.app/
