const getUserErrorInfo = (user)=>{
    return `One or more properties were incomplete or not valid
    List of required properties:
        *first_name: expected String, received ${user.first_name} 
        *last_name: expected String, received ${user.last_name} 
        *email: expected String, received ${user.email} 
        `
}

module.exports = getUserErrorInfo;