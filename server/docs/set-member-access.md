## Set Member Access
- Middleware used in api flow (setMemberAccess())
- Adds memberAccess object to `req`

### The where condition
- Using setMemberAccess and the where condition allows filtering by authorization
  ```
    let whereCondition = {}
    
    if superAdmin then leave the where as is (Find All)
    - otherwise
        whereCondition = {
            id: {
                [Op.in]: req.memberAccess.groups.readGroups || [];
            }
        }
  ```
- Mapping members