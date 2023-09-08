
document.addEventListener("DOMContentLoaded", function () {

    fetch('/data.json')
        .then(response => response.json())
        .then(data => load(data));

    function load(file) {
        file = file || null;

        // Hora y fecha actual
        function mostrarFechaHora() {
            var fechaHora = new Date();
            var dia = fechaHora.getDate().toString().padStart(2, '0');
            var mes = (fechaHora.getMonth() + 1).toString().padStart(2, '0'); 
            var anio = fechaHora.getFullYear();
            var hora = fechaHora.getHours().toString().padStart(2, '0');
            var minutos = fechaHora.getMinutes().toString().padStart(2, '0');
            var segundos = fechaHora.getSeconds().toString().padStart(2, '0');
            var formatoFechaHora = dia + '-' + mes + '-' + anio + ' ' + hora + ':' + minutos + ':' + segundos;

            document.getElementById('fecha_hora').textContent = 'Datos actualizados a: ' + formatoFechaHora;
        }

        // Descargar imagen
        function captureAndDownloadPage() {
            html2canvas(document.body).then(function(canvas) {
                var link = document.createElement('a');
                link.download = 'influcard.png';
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        }


        let htmlContent = '';

        htmlContent += `
            <div class="container-fluid">
                
                <div class="row gx-2">
                    <div class="col-4">
                        <div class="d-flex m-2 position-relative">
                        <img src="/assets/flags/4x3/instagram.png" alt="instagram" class="position-absolute top-0 start-0 insta"> 
                                <div class="flex-shrink-0 text-end ms-3">
                                    
                                    <img class="rounded-circle image-principal" src="${file.influcard.account_picture}" alt="Imagen de perfil" id="profileImage">
                                </div>
                            <div class="flex-grow-1 ms-3 d-flex flex-column">
                                <span class="tittle">${file.influcard.name}</span>
                                <span class="sub-tittle"><i class="fa-brands fa-instagram spaceImagen" style="color: #E1306C;"></i>${file.influcard.email}</span>
                                <span><img class="spain spaceImagen" src="${file.influcard.top_countries_formated[0].href}" alt="Bandera de Españas"> ES <i class="fa-solid fa-venus" style="color: #ff00ff;"></i>Mujer, 32 Años</span>                    
                            </div>
                        </div>
                    </div>
                        <div class="col-4 text-center center-percentaje">
                            <div class="m-2 w-50">
                                <div class="flex-wrapper ">
                                    <div class="single-chart">
                                    <span id="blue">Reach</span>
                                    <svg viewBox="0 0 36 36" class="circular-chart blue">
                                        <path class="circle-bg"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path class="circle"
                                        stroke-dasharray="100, 100"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <text x="18" y="20.35" class="percentage">100%</text>
                                    </svg>
                                </div>
                                
                                <div class="single-chart">
                                    <span id="orange">Relevance</span>
                                    <svg viewBox="0 0 36 36" class="circular-chart orange">
                                        <path class="circle-bg"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path class="circle"
                                        stroke-dasharray="83, 100"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <text x="18" y="20.35" class="percentage">83%</text>
                                    </svg>
                                </div>
                            
                                <div class="single-chart">
                                    <span id="green">Resonance</span>
                                    <svg viewBox="0 0 36 36" class="circular-chart green">
                                        <path class="circle-bg"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <path class="circle"
                                        stroke-dasharray="60, 100"
                                        d="M18 2.0845
                                            a 15.9155 15.9155 0 0 1 0 31.831
                                            a 15.9155 15.9155 0 0 1 0 -31.831"
                                        />
                                        <text x="18" y="20.35" class="percentage">60%</text>
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4 text-end justify-content-evenly">
                        <div class="icons w-50 float-end text-muted">           
                            <span class="m-1 ms-4"><i class="fa-solid fa-right-from-bracket me-1"></i> Salir</span>
                            <span class="m-1 ms-4" id="capture"><i class="fa-solid fa-download me-1"></i> Descargar influcard</span>
                            <span class="m-1 ms-4"><i class="fa-solid fa-eye me-1"></i> Ver perfil</span>
                            </span><span id="fecha_hora"></span>
                        </div>
                    </div>
                </div>   

                <div class="row gx-2">
                    <div class="col-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <i class="fa-solid fa-users fa-xl radius-border icon-width"></i><span class="tittle-grey">AUDIENCIA</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <i class="fa-solid fa-camera fa-xl radius-border icon-width"></i><span class="tittle-grey">PUBLICACIONES</span>
                            </div>
                        </div>
                    </div>
                    <div class="col-4">
                        <div class="card shadow-sm">
                            <div class="card-body">
                                <i class="fa-solid  fa-chart-line fa-xl radius-border icon-width"></i><span class="tittle-grey">DESEMPEÑO</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row gx-2">
                    <div class="col-4">
                            <div class="card my-2">
                                <div class="card-body">
                                    <div class="d-flex justify-content-around">
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">Audiencia</span>
                                            <span class="py-3"><i class="fa-solid fa-users fa-2xl" style="color: #5b7184;"></i></span>
                                            <span class="text-muted">${file.influcard.followers_formated}</span>
                                        </div>
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">Seguidores Fake</span>
                                            <span class="py-3"><i class="fa-solid fa-users fa-2xl" style="color: #5b7184;"></i></span>
                                            <span class="text-muted">${file.influcard.fake_followers_formated} %</span>
                                        </div>
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">Audiencia Real</span>
                                            <span class="py-3"><i class="fa-solid fa-users fa-2xl" style="color: #5b7184;"></i></span>
                                            <span class="text-muted">${file.influcard.real_followers_formated}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="card my-2">
                            <div class="card-body">                                    
                                <p class="titulo">Distribucion por edad</p>
                                <div class="row my-4">
                                    <div class="col-2">13-17</div>
                                    <div class="col-8">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 9.27%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-2">9.27%</div>
                                </div>
                                <div class="row my-4">
                                    <div class="col-2">18-24</div>
                                    <div class="col-8">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 14.07%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-2">14-07%</div>
                                </div>
                                <div class="row my-4">
                                    <div class="col-2">25-34</div>
                                    <div class="col-8">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 54.92%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-2">54.92%</div>
                                </div>
                                <div class="row my-4">
                                    <div class="col-2">35-44</div>
                                    <div class="col-8">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 17.74%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-2">17.74%</div>
                                </div>
                                <div class="row my-4">
                                    <div class="col-2">45-64</div>
                                    <div class="col-8">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 3.85%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-2">3.85%</div>
                                </div>
                                <div class="row my-4">
                                    <div class="col-2">65 +</div>
                                    <div class="col-8">
                                        <div class="progress">
                                            <div class="progress-bar" role="progressbar" style="width: 0.17%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-2">0.17%</div>
                                </div>
                            </div>
                        </div>
                        <div class="row mx-2">
                            <div class="col-6 card">
                                <p class="titulo">Distribucion por género</p>
                                <div id="chartdiv4"></div>
                            </div>
                            <div class="col-6 card">   
                                <p class="titulo">Distribucion por país</p>
                                <div class="row my-3">
                                    <div class="col-2"><img src="/assets/flags/4x3/es.png" alt=""></div>
                                    <div class="col-2">ES</div>
                                    <div class="col-5">
                                        <div class="progress">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 47.37%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-3">47.37%</div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-2"><img src="/assets/flags/4x3/us.png" alt=""></div>
                                    <div class="col-2">US</div>
                                    <div class="col-5">
                                        <div class="progress">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 11.84%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-3">11.84%</div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-2"><img src="/assets/flags/4x3/mx.png" alt=""></div>
                                    <div class="col-2">MX</div>
                                    <div class="col-5">
                                        <div class="progress">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 5.67%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-3">5.67%</div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-2"><img src="/assets/flags/4x3/fr.png" alt=""></div>
                                    <div class="col-2">FR</div>
                                    <div class="col-5">
                                        <div class="progress">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 4.05%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-3">4.05%</div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-2"><img src="/assets/flags/4x3/it.png" alt=""></div>
                                    <div class="col-2">IT</div>
                                    <div class="col-5">
                                        <div class="progress">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 3.88%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-3">3.88%</div>
                                </div>
                                <div class="row my-3">
                                    <div class="col-2"><img src="/assets/flags/4x3/otros.png" alt=""></div>
                                    <div class="col-2">Otr</div>
                                    <div class="col-5">
                                        <div class="progress">
                                            <div class="progress-bar bg-danger" role="progressbar" style="width: 27.19%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                    <div class="col-3">27.19%</div>
                                </div>
                                
                            </div>
                        </div>
                     
                    </div>
                    <div class="col-4">
                        <div class="card my-2">
                            <div class="card-body">
                                <p class="titulo">Distribucion de sus publicaciones por territorios</p>
                                <div id="chartdiv3"></div>
                            </div>
                        </div>
                        <div class="card my-2">
                            <div class="card-body">
                                <p class="titulo">Franja horaria de sus publicaciones</p>
                                <div id="chartdiv2"></div>
                            </div>
                        </div>
                        <div class="card my-2">
                            <div class="card-body">
                                <div class="card-body">
                                    <p class="titulo">Marcas con las que he trabajdo</p>
                                    <div class="row">
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/benefit.png" alt="benefit">
                                            <span class="text-muted">Benefit</span>
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/YSL.png" alt="YSL">
                                            <span class="text-muted">YSL</span> 
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/NYX.png" alt="NYX">
                                            <span class="text-muted">NYX</span>
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/Guerlain.png" alt="Guerlain">
                                            <span class="text-muted">Guerlain</span>  
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/MAC.png" alt="MAC">
                                            <span class="text-muted">MAC</span>
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/estee_lauder.png" alt="Estee Lauder">
                                            <span class="text-muted">Estee Lauder</span>  
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/NARS.png" alt="NARS">
                                            <span class="text-muted">NARS</span>
                                        </div>
                                        <div class="col-3 text-center">
                                            <img class="img-fluid" src="/assets/flags/4x3/Clarins.png" alt="Clarins">
                                            <span class="text-muted">Clarins</span> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-4  ">
                        <div class="card my-2">
                            <div class="card-body">
                                <div class="d-flex justify-content-between"><span class="text-grey"><i class="fa-solid fa-users fa-sm icon-width" id="audiencia"></i>Audiencia</span><span class="text-grey"> ${file.influcard.followers_formated}</span></div>
                                <div class="d-flex justify-content-between"><span class="text-grey"><i class="fa-solid fa-user fa-sm icon-width" id="alcance"></i>Alcance</span><span class="text-grey"> ${file.influcard.reach_formated}</span></div>
                            </div>
                        </div>
                        <div class="card my-2">
                            <div class="card-body">
                                <div class="d-flex justify-content-between"><span class="text-grey"><i class="fa-solid fa-fingerprint fa-sm icon-width" id="impresiones"></i>Impresiones</span><span class="text-grey"> ${file.influcard.avg_impressions_formated}</span></div>
                                    <div class="d-flex justify-content-around">
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">${file.influcard.ir_alcance} %</span>
                                            <span class="text-muted">Alcance</span>
                                        </div>
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">${file.influcard.ir_audiencia} %</span>
                                            <span class="text-muted">Audiencia</span>   
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        <div class="card my-2">
                            <div class="card-body">
                                <div class="d-flex justify-content-between"><span class="text-grey"><i class="fa-solid fa-play fa-sm icon-width" id="reproduciones"></i>Reproduciones</span><span class="text-grey"> ${file.influcard.vplays_formated}</span></div>
                                    <div class="d-flex justify-content-around">
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">${file.influcard.vr_alcance} %</span>
                                            <span class="text-muted">Alcance</span>
                                        </div>
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">${file.influcard.vr_audiencia} %</span>
                                            <span class="text-muted">Audiencia</span>   
                                        </div>
                                    </div>  
                                </div>
                            </div>
                        <div class="card my-2">
                            <div class="card-body">
                                <div class="d-flex justify-content-between"><span class="text-grey"><i class="fa-solid fa-heart fa-sm icon-width" id="engagement"></i>Engagement</span><span class="text-grey"> ${file.influcard.avg_engagement_formated}</span></div>
                                    <div class="d-flex justify-content-around">
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">${file.influcard.er_alcance} %</span>
                                            <span class="text-muted">Alcance</span>
                                        </div>
                                        <div class="d-flex flex-column text-center">
                                            <span class="text-muted">${file.influcard.er_audiencia} %</span>
                                            <span class="text-muted">Audiencia</span>   
                                        </div>
                                    </div>
                                </div>
                            </div>
                        <div class="card my-2">
                            <div class="card-body">
                                <p class="titulo">Engagement rate regund dia de publicacion</p>  
                                <div id="chartdiv"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        `;

        const fileInformation = document.getElementById("fileInformation");
        fileInformation.innerHTML = htmlContent;
        mostrarFechaHora();

        grafico1();
        grafica2();
        grafica3();
        grafica4();
        document.getElementById('capture').addEventListener('click', captureAndDownloadPage);


    }
});

