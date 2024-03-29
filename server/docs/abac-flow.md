## ABAC Flow (Server)

### Authentication
- `/auth`
    - POST `/auth/login`. Body includes `{email, password }`
      - Find one where email exists, none found = "Authentication failed" (404)
      - Match password to found user, no match = "Authentication failed" (404)
      - If both are good, generate JWT using member id, email and name
      - return json({token: token}) (200) <-- this is the jwt
      
### JWT
- Located in `/utils/auth.js`
- Payload is passed in:
    - Member Id
    - Member Email
    - Member Name

### Authorization
- `/api` routes use `setMemberAccess` middleware
- Authorization middleware exported from `/utils/memberABAC.js`
    - setMemberAccess()
        - Major function:
            - Checks to make sure req.headers.authorization (the jwt) exists, otherwise responds with 404 'No Token'
            - Verifies token using `/utils/auth` verifyToken function
            - If verified AND has a memberId in the payload continue, otherwise response 401 'Invalid Token'
            - Then checks expiration time is good and continues if it is, othewise 401 'Expired Token'
            - Sets a memberAccess object up that will later be added to req (req.memberAccess)
                ```
                  const memberAccess = {
                    memberId: verifiedToken.memberId,
                    superAdmin: false,
                    groups: {
                        readGroups: [], // Read only
                        writeGroups: [], // Create, Read, Update, and Delete (full CRUD)
                        members: new Map(), // Members of all the groups
                    },
                };
                ```
                - memberId is the id of the member logged in
                - superAdmin true or false: check is done on SuperAdmin Model
                - memberAccess.members('write') includes the individual logging in which will allow individual members to access and update their own information.
                - Groups are important if the user is an admin (function checks to see if they have `isAdmin` set)
                    - Read... what groups can this member read
                    - Write... which ones they can update (ie. `isAdmin = true`)
                    - Members: mapping of groups -> member (array)
    - isGroupAdmin()
    - isGroupMember()
        - isGroupAdmin and isGroupMember accept the `req` and `groupId` to see if the req.memberAccess read and write groups include the respective member id