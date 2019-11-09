import * as apiCalls from './elements_api';

const APIURL = '/api/templates/';


/* elements apiCalls */

const addElement = async function(value,url) {
    await apiCalls.createElement(value,url);
}

/* For all templtes */
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

///CREATE TEMPLATE
export async function createTemplate(templateObj){
    const title = templateObj.title,
        owner = templateObj.owner,
        description = templateObj.description,
        duration = templateObj.duration,
        confirmation_status = templateObj.confirmation_status,
        elements = templateObj.elements,
        managers = templateObj.assignedManager;
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
            managers: managers
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
		return res.json().then(newTemplate => {
            const templateId = newTemplate._id;
            const eURL = APIURL + templateId + '/elements';
            elements.forEach((element) =>{
                addElement(element,eURL); 
            })
            // managers.forEach((manager) => {
            //     newTemplate.managers.push(manager);
            // })
            // newTemplate.save();
            
        });
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