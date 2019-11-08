const APIURL = '/api/users/';
export async function getOneUser(id){
    const getOneURL = APIURL + id;
    return fetch(getOneURL)
    .then(res => {
        if (!res.ok) {
            if (res.status >= 400 && res.status < 500) {
                return res.json().then(data => {
                    let err = { errorMessage: data.message };
                    throw err;
                })
            } else {
                let err = { errorMessage: 'Server is not responding' };
                throw err;
            }
        }
        return res.json();
    })
}