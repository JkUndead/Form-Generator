const APIURL = '/api/templates/';

export async function createElement(elementObj,eURL) {
    const name = elementObj.name;
    const type = elementObj.type;
    return fetch(eURL, {
        method: 'post',
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({
            name: name,
            type: type
        })
    }).then(res =>{
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
        return res.json()
    })
}

export async function removeElements(id){
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