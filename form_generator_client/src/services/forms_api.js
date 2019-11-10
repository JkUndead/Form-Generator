const APIURL = '/api/forms/'

/* For all forms */
export async function getForms() {
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


export async function createForm(formObj) {
    const templateId = formObj.templateId,
        title = formObj.title,
        elementValues = formObj.elementValues,
        userName = formObj.userName,
        email = formObj.email,
        managerList = formObj.managerList,
        role = formObj.role;
    return fetch(APIURL, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            templateId: templateId,
            title: title,
            elementValues: elementValues,
            userName: userName,
            email: email,
            role: role,
            managerList: managerList
        })
    }).then(res => {
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
        return res.json()
    })

}

export async function getOneForm(id) {
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

export async function updateForm(formObj, id) {
    const updateURL = '/api/forms/' + id;
    const status = formObj.status,
        email = formObj.email,
        currentProgress = formObj.currentProgress;
    return fetch(updateURL, {
        method: 'put',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            status: status,
            email: email,
            currentProgress: currentProgress
        })
    })
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


export async function removeForm(id) {
    const deleteURL = APIURL + id;
    return fetch(deleteURL, {
        method: 'delete'
    })
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