document.addEventListener('DOMContentLoaded', function () {
    fetch('https://my.api.mockaroo.com/users.json?key=7a6098a0')
        .then(response => response.json())
        .then(data => {
            const zapatoCardsContainer = document.getElementById('zapatoCards');
            data.slice(0, 3).forEach(zapato => { // Aquí se limita a las primeras tres cartas
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('col-lg-3', 'col-md-3', 'col-sm-12', 'col-xs-12', 'mx-auto');
                cardDiv.innerHTML = `
                    <div class="card" style="width: 18rem;">
                        <img src="${zapato.imagen}" class="card-img-top" alt="${zapato.nombre}">
                        <div class="card-body">
                            <h5 class="card-title">${zapato.nombre}</h5>
                            <p class="card-text">${zapato.precio}</p>
                        </div>
                    </div>
                `;
                zapatoCardsContainer.appendChild(cardDiv);
            });
        })
        .catch(error => console.error('Error recibiendo los datos:', error));

});