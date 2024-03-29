const messages = {
    accessDenied: "Access denied",
    authenticationFailed: "Authentication failed",
    badRequest: "Bad request",
    conflict: "Conflict",
    databaseCreateFailed: {
        error: "Database create failed",
        message: "The requested resource could not be created"
    },
    expiredToken: "Token has expired",
    invalidInput: "Invalid input",
    invalidToken: "Invalid token",
    login: "Login",
    logout: "Logout",
    memberExistsInGroup: "Member already exists in group",
    notLoggedIn: "Member not logged in",
    noTokenProvided: "No token found",
    resourceNotFound: {
        error: "Resource not found",
        message: "The requested resource does not exist or member does not have access to it"
    },
    serverError: "Internal server error",
    signup: "Signup",
    unauthorizedAccess: "Unauthorized access",
    updateSuccess: "Resource updated successfully"

    // Add more error messages as needed
};

module.exports = messages;
