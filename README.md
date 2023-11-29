# GittyUp

## Accessing
[Hosted on EC2](http://ec2-3-139-91-77.us-east-2.compute.amazonaws.com:3000)

## Build and Run
### Backend (Flask)
```shell
cd server
python -m pip install -r requirements.txt
flask run
```

### Front End (React)
```shell
cd frontend
npm install
npm start
```
Or, if hosting:
```shell
cd frontend
npm install
npm install -g serve
npm run build
serve -s build
```

### Notes
- The cloud hosted server relies on [neo4j](https://neo4j.com), which is hosted separately by neo4j using their free tier. This shuts off after three days of inactivity, so please notify me so that  I can resume the database.
- If running the server locally, the `secrets.properties` file needs to be added into the `server` folder.
- Deployment is automated through GitHub Actions and Docker.

## Scalability
- An endpoint already exists for adding hardware, but it is not exposed to the users from the frontend.
- User accounts have "names" which are separate from their username. This name can be used to personalize the user experience. Currently, projects and hardware sets have optional descriptions. This can be improved to be editable in the future.
- Billing can be easily implemented by adding to a balance counter linked to a project. When a user checks out a hardware set, that counter will be increased based on the price of the hardware set. A payment API can be used for users to pay their balances.