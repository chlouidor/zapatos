const apiUrl = 'https://my.api.mockaroo.com/users.json?key=7a6098a0';
        let carrito = [];

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                displayZapatillas(data);
            })
            .catch(error => console.error('Error fetching data:', error));

        function displayZapatillas(zapatillas) {
            const container = document.getElementById('zapatillas-container');
            const filteredZapatillas = zapatillas.filter(zapatilla => zapatilla.tipo.toLowerCase() === 'mujer');
            filteredZapatillas.forEach((zapatilla, index) => {
                if (index % 3 === 0) {
                    const row = document.createElement('div');
                    row.className = 'row';
                    container.appendChild(row);
                }
                const card = createZapatillaCard(zapatilla);
                container.lastChild.appendChild(card);
            });
        }

        function createZapatillaCard(zapatilla) {
            const col = document.createElement('div');
            col.className = 'col-md-4';
            col.innerHTML = `
                <div class="card" data-toggle="modal" data-target="#zapatillaModal" data-zapatilla='${JSON.stringify(zapatilla)}'>
                    <img src="${zapatilla.imagen}" class="card-img-top" alt="${zapatilla.nombre}">
                    <div class="card-body">
                        <h5 class="card-title">${zapatilla.nombre}</h5>
                        <p class="card-text">${zapatilla.descripcion.substring(0, 100)}...</p>
                        <p class="card-text"><strong>Precio:</strong> $${zapatilla.precio}</p>
                    </div>
                </div>
            `;
            return col;
        }

        $('#zapatillaModal').on('show.bs.modal', function (event) {
            const button = $(event.relatedTarget);
            const zapatilla = button.data('zapatilla');
            const modal = $(this);
            modal.find('.modal-title').text(zapatilla.nombre);
            modal.find('#modalImage').attr('src', zapatilla.imagen);
            modal.find('#modalDescription').text(zapatilla.descripcion);
            modal.find('#modalTipo').text(zapatilla.tipo);
            modal.find('#modalPrecio').text(zapatilla.precio);
            modal.find('#modalAgregarCarrito').data('zapatilla', zapatilla);
        });

        $('#modalAgregarCarrito').on('click', function () {
            const zapatilla = $(this).data('zapatilla');
            agregarAlCarrito(zapatilla);
            mostrarMensaje();
        });

        function agregarAlCarrito(zapatilla) {
            const itemExistente = carrito.find(item => item.id === zapatilla.id);
            if (itemExistente) {
                itemExistente.cantidad++;
            } else {
                carrito.push({ ...zapatilla, cantidad: 1 });
            }
            actualizarCarrito();
            $('#zapatillaModal').modal('hide');
        }

        function actualizarCarrito() {
            const carritoItems = document.getElementById('carrito-items');
            carritoItems.innerHTML = '';
            let total = 0;

            carrito.forEach(item => {
                const itemTotal = item.precio * item.cantidad;
                total += itemTotal;

                const row = document.createElement('tr');
                row.innerHTML = `
                    <td><img src="${item.imagen}" class="img-fluid" style="max-width: 50px;" alt="${item.nombre}"></td>
                    <td>${item.nombre}</td>
                    <td>$${item.precio}</td>
                    <td>
                        <input type="number" class="form-control cantidad" value="${item.cantidad}" min="1" data-id="${item.id}">
                    </td>
                    <td>$${itemTotal}</td>
                    <td>
                        <button class="btn btn-danger eliminar-carrito" data-id="${item.id}">Eliminar</button>
                    </td>
                `;
                carritoItems.appendChild(row);
            });

            document.getElementById('carrito-total').textContent = total;
            document.getElementById('cart-count').textContent = carrito.length;
        }

        function mostrarMensaje() {
            $('#alertMessage').fadeIn();
            setTimeout(function() {
                $('#alertMessage').fadeOut();
            }, 3000);
        }

        $(document).on('input', '.cantidad', function () {
            const id = $(this).data('id');
            const cantidad = parseInt($(this).val());
            const itemIndex = carrito.findIndex(item => item.id === id);
            if (itemIndex !== -1) {
                carrito[itemIndex].cantidad = cantidad;
                actualizarCarrito();
            }
        });

        $(document).on('click', '.eliminar-carrito', function () {
            const id = $(this).data('id');
            carrito = carrito.filter(item => item.id !== id);
            actualizarCarrito();
        });