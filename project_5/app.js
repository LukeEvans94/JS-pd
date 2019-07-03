document.querySelector('.get-jokes').addEventListener('click',getJokes);
function getJokes(e) {
    const number = document.querySelector('input[type="number"]').value;
    fetch(`http://api.icndb.com/jokes/random/${number}`)
        .then(res => res.json())
        .then(data => {
            let output ='';
            if(data.type === 'success') {
                data.value.forEach(joke => output += `<li>${joke.joke}</li>`);
            } else {
                output += '<li>Something went wrong</li>';
            }

            document.querySelector('.jokes').innerHTML = output;
        });
    
    e.preventDefault();    
}