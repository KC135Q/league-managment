# ABAC Basic Developer Guide

### Unit testing
- Route & controller separation of concerns for testing and unit cohesion:
  - Controllers return objects containing the information needed for the route response
  - Routes return responses (res.)

### Standardization
- Messages used throughout the application should be stored centrally in `utils/strings.js`

### Database
- [ABAC ERD](./images/abac-erd-v0.2.png)
- Database [naming conventions](https://medium.com/@centizennationwide/mysql-naming-conventions-e3a6f6219efe)
- [Markdown Cheatsheet](https://www.markdownguide.org/basic-syntax/)

### Issues
- Issues are track on this [GitHub Project](https://github.com/users/KC135Q/projects/18).
- New ideas go into the `Todo` column
- Issues in the queue to be handled in the next month(?) should be in the `Backlog` column
- Only issues actively being worked on should be in the `In Progress`
  - Each developer *should* only have one Issue `In Progress` at a time