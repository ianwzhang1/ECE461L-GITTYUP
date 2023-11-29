
## Scalability
- An endpoint already exists for adding hardware, but it is not exposed to the users from the frontend.
- User accounts have "names" which are separate from their username. This name can be used to personalize the user experience. Currently, projects and hardware sets have optional descriptions. This can be improved to be editable in the future.
- Billing can be easily implemented by adding to a balance counter linked to a project. When a user checks out a hardware set, that counter will be increased based on the price of the hardware set. A payment API can be used for users to pay their balances.