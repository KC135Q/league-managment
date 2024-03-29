## Database Design [ERD](./images/abac-erd-v0.2.png)
- Referencing [Sequelize data types](https://sequelize.org/docs/v7/models/data-types/)
- [x] ABAC/RBAC combination [OWASP Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)  

### Random notes
- Database tables are singular
- Tables will have an `id` as the primary key, with auto increment, Integer data type and required. Basically looking for [3NF](https://www.dba-oracle.com/t_design_third_normal_form_3nf.htm) to start.


### To Do
- REDIS or similar cache (later if required)
- Sign in with [Google, Apple, Email/Password] (email/password start)
- Multifactor Authentication and/or Mobile Authentication (our own)... (much, much later)
- Exponentional increase in login delay on incorrect email/password combination (client side)
- Three minute (?) delay in email to reset password. Link only good for 7 (?) minutes. <-- More research required
  
### Initial Research
- **Schema version 0.2**
    #### Models
      - Attribute: `id` and `attributeName` no timestamps. `attributeName` values include `Full Access`, `No Access` and more
      - Group: `id`, `groupName`, `parentGroupId`, `childGroupIds`, `policies`, and `createdAt`
      - Member: `id`, `memberName`, `email`, `notes`, `password`, `status`, `createdAt`, and `updatedAt`
        - email is used to login in - must be unique
        - notes field = future use
        - password is hashed
        - status default is `active` but could be `blocked`, `inactive`
      - Membership: `id`, `memberId`, `groupId`, `attributes`, `isAdmin`, `createdAt`, and `udpatedAt`
        - The glue that ties members to groups
        - Attributes can restrict access
        - isAdmin = if the member is an admin of the group they are associated with
            - DO NOT select isAdmin if the member is a superAdmin... that is handled separately
      - Policy: Future Use with Groups(:shrug)
      - SuperAdmin: Singular property (no timestamps or id pk) - `memberId` This Model is a list of all site Super Admins 🦸🏻‍♂️
- **Flow**
```
The most secure data flow for web app access typically involves several key components to ensure both security and privacy. Here's a general overview:

User Authentication: This is the first step, where the user provides credentials (like member name and password). Multi-factor authentication (MFA) adds an extra layer of security.

Secure Transmission: Once the user inputs their credentials, this data should be transmitted securely using HTTPS (Hypertext Transfer Protocol Secure), which encrypts the data during transmission.

Server-Side Validation: The server then validates these credentials. This should happen in a secure environment to prevent unauthorized access or attacks like SQL injection.

Session Management: Upon successful authentication, the server creates a session for the user. This session is managed securely with a unique session ID and should have mechanisms to prevent session hijacking.

Data Access Control: Access to data within the web app is controlled based on user roles and permissions. This ensures users can only access the data they are authorized to see.

Data Encryption: Sensitive data stored in databases should be encrypted. This protects the data in case of unauthorized database access.

API Security: If the web app interacts with APIs, these should be secured to prevent vulnerabilities like data leaks or unauthorized access.

Regular Security Audits and Updates: The web app should undergo regular security audits to find and fix vulnerabilities. Also, keeping the software updated is crucial to protect against known exploits.

Logging and Monitoring: Continuous logging and monitoring of activities can help in detecting and responding to security incidents promptly.

End-to-End Encryption: For highly sensitive data, end-to-end encryption ensures that data is encrypted from the client side and only decrypted at the intended destination.

Security Headers and Policies: Implementing various HTTP headers like Content Security Policy (CSP), X-Content-Type-Options, X-Frame-Options, etc., can help mitigate certain types of attacks like cross-site scripting (XSS) and clickjacking.

This data flow ensures that each step in the process of accessing and using a web app is secure, protecting both the user's credentials and the data they access.
```
- **Using JWT**
```
JWT is an important part of secure web app access, especially in the context of authentication and session management. Here's how JWT fits into the secure data flow of a web app:

User Authentication: When a user logs in, instead of creating a traditional session, the server generates a JWT. This token contains encoded JSON data that typically includes the user's identity and possibly other attributes, like roles and permissions.

Token Signing: The server signs the JWT with a secret key or a public/private key pair. This signature ensures that the token cannot be tampered with after it's issued.

Secure Transmission: The JWT is then sent back to the user's browser. Just like any sensitive data, this should be transmitted over HTTPS to protect it from being intercepted.

Client Storage: The client (user's browser or mobile app) stores the JWT, often in local storage or in a secure cookie. This token will be used for subsequent requests to authenticate the user.

Sending Token in Requests: When the user makes requests to the server, the JWT is included, usually in the HTTP Authorization header. This allows the server to identify and authenticate the user for each request without needing to maintain a server-side session.

Token Validation: On receiving a request with a JWT, the server first validates the token - it checks the signature to ensure the token is genuine and not expired.

Access Control: Once the JWT is validated, the server can read the user's identity and permissions from the token, allowing access control to be managed.

Statelessness and Scalability: Since the JWT contains all necessary information about the user, the server doesn't need to maintain session state. This makes JWT-based authentication stateless, which is beneficial for scalability and performance.

JWTs are a popular choice in modern web applications, especially those using RESTful APIs or microservices, due to their stateless nature and ease of use across different domains and services. However, it's important to handle JWTs securely to prevent security issues like token leakage or unauthorized access.
```