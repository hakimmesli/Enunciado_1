
document.addEventListener("DOMContentLoaded", function () {
    fetch('data.json') 
        .then(response => response.json())
        .then(data => load(data));

    function load(file) {
        file = file || null;

        const repetitions = 6;
        let htmlContent = '';

        for (let i = 0; i < repetitions; i++) {
            // Intereses
            const interestsArray = file.influcard.interests.split(',').slice(0, 2);
            const shortInterests = interestsArray.join(', ') + '...';

            // Fakes
            const fakes = file.influcard.fakes;
            const fakesWithK = fakes / 1000;
            const fakesChanged = fakesWithK.toFixed(2) + " K";

            // Engrate
            const engrate = file.influcard.post_week_day[6].engrate;
            const engratePercentage = Math.round(engrate * 100) / 100;
            const engrateChanged = engratePercentage.toFixed(2).replace('.', ',') + " %";

            htmlContent += `
            <div class="col-md-4">
                <div class="box">
                    <div class="left-content">
                        <i class="fa-solid fa-bars iconAbsolute"></i>
                        <figure class="imageContainer">
                        <img class="userImage" src="${file.influcard.account_picture}" alt="Imagen de perfil" id="profileImage">
                            <div class="imageOverlay">Ver influencer</div>
                        </figure>
                        <span><i class="fa-brands fa-instagram spaceImagen" style="color: #E1306C;"></i>${file.influcard.email}</span>
                        <span>Mujer, 34 años</span>
                        <span><img class="spaceImagen" src="${file.influcard.top_countries_formated[0].href}" alt="Bandera de Españas">${file.influcard.top_countries_formated[0].country}</span>
                        <span>${shortInterests}</span>
                    </div>
                    <div class="right-content">
                        <h1>${file.influcard.name}</h1>
                        <div class="pullApart"><span><i class="fa-solid fa-users spaceImagen"></i>Audiencia: </span><span>${file.influcard.followers_formated}</span></div>
                        <div class="pullApart"><span><i class="fa-solid fa-user-xmark spaceImagen"></i>Fakes: </span><span>${fakesChanged}</span></div>
                        <div class="pullApart"><span><i class="fa-solid fa-heart spaceImagen"></i>Media Eng: </span><span>${file.influcard.engagement_formated}</span></div>
                        <div class="pullApart"><span><i class="fa-solid fa-heart-pulse spaceImagen"></i>Eng Rate: </span><span>${engrateChanged}</span></div>
                        <div class="pullApart"><span><i class="fa-solid fa-eye spaceImagen"></i>Impresiones: </span><span>${file.influcard.impressions_formated}</span></div>
                    </div>
                </div>
            </div>

            `;
        }
        const userInformation = document.getElementById("userInformation");
        userInformation.innerHTML = htmlContent;

        document.querySelector('.userImage').addEventListener('click', function () {
            Swal.fire({
              title: 'Cargando',
              html: 'La pagina cargará en<b></b> milisegundos.',
              timer: 2000,
              timerProgressBar: true,
              didOpen: () => {
                Swal.showLoading();
                const b = Swal.getHtmlContainer().querySelector('b');
                timerInterval = setInterval(() => {
                  b.textContent = Swal.getTimerLeft();
                }, 100);
              },
              willClose: () => {
                clearInterval(timerInterval);
                window.location.href = '/HTML/ficha.html';
              }
            });
          });
          
        
    }
});











































