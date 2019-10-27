const APIURL = '/api/templates/';


export async function getTemplates() {
    return fetch(APIURL)
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