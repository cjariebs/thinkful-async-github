'use strict';

function getRepoByUsername(username) {
    const uri = `https://api.github.com/users/${username}/repos`;
    console.log(uri);

    return fetch(uri)
	.then(response => {
	    if (response.ok) {
		return response.json();
	    }
	    throw new Error(response.statusText);
	})
}

function updateSearchResults(results) {
    const ele = $('.results');
    ele.html('');
    
    for (let i=0; i < results.length; i++) {
	let result = results[i];
	ele.append(`
	<li>
	    <a href="${result.html_url}">${result.name}</a>
	</li>`
	);
    }
}

function handleSearchForm() {
    $('form').submit(event => {
	event.preventDefault();

	const username = $('input[name="username"]').val();
	getRepoByUsername(username)
	.then(result => {
	    updateSearchResults(result);
	});
    });
}

$(handleSearchForm());
