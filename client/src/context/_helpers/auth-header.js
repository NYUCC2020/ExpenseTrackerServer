// Returns an HTTP Authorization header containing the JWT of the 
// currently logged in user from local storage.

export function authHeader() {
    // return authorization header with jwt token
    let user = JSON.parse(localStorage.getItem('user'));

    if (user && user.token) {
        return { 'Authorization': 'Bearer ' + user.token };
    } else {
        return {};
    }
}