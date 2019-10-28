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

export async function createTemplate(templateObj){
    const title = templateObj.title,
        owner = templateObj.owner,
        description = templateObj.description,
        duration = templateObj.duration,
        confirmation_status = templateObj.confirmation_status,
        elements = templateObj.elements;

	return fetch(APIURL, {
		method: 'post',
		headers: new Headers({
			'Content-Type': 'application/json',
		}),
		body: JSON.stringify({
            title: title, 
            owner: owner, 
            description: description, 
            duration: duration, 
            confirmation_status: confirmation_status, 
            elements: elements
        })
	})
	.then(res =>{
		if(!res.ok) {
			if(res.status >= 400 && res.status < 500) {
				return res.json().then(data =>{
					let err = {errorMessage: data.message};
					throw err;
				})
			} else {
				let err = {errorMessage: 'Server is not responding'};
				throw err;
			}
		}
		return res.json();
	})
}



/* For each template */

///SHOW ONE TEMPLATE
export async function getOneTemplate(id){
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

///DELETE
export async function removeTemplate(id){
	const deleteURL = APIURL + id;
	return fetch(deleteURL, {
		method: 'delete'
	})
	.then(res =>{
		if(!res.ok) {
			if(res.status >= 400 && res.status < 500) {
				return res.json().then(data =>{
					let err = {errorMessage: data.message};
					throw err;
				})
			} else {
				let err = {errorMessage: 'Server is not responding'};
				throw err;
			}
		}
		return res.json();
	})
}

///UPDATE
export async function updateTemplate(templateObj,id){
    const updateURL = '/api/templates/' + id;
        const title = templateObj.title,
            owner = templateObj.owner,
            description = templateObj.description,
            duration = templateObj.duration,
            confirmation_status = templateObj.confirmation_status,
            elements = templateObj.elements;
        return fetch(updateURL, {
            method: 'put',
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
            body: JSON.stringify({
                title: title, 
                owner: owner, 
                description: description, 
                duration: duration, 
                confirmation_status: confirmation_status, 
                elements: elements
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