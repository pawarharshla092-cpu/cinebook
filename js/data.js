const theaters=['CineBook Central, Screen 3','Aurora Multiplex, Screen 1','Galaxy Cinema, Screen 5'];
const visuals={'Sci-Fi':['violet','✦'],Drama:['orange','◒'],Action:['green','⚡'],Comedy:['pink','☾'],Animation:['blue','✺'],Thriller:['teal','≈'],Romance:['pink','♥'],Horror:['teal','◈'],Family:['blue','✧']};
function decorate(movie){const [accent,symbol]=visuals[movie.genre]||['violet','✦'];return {...movie,id:movie._id,accent,symbol};}
async function getMovie(id){const r=await fetch(`/api/movies/${id}`);if(!r.ok)throw Error('Movie not found');return decorate((await r.json()).movie);}
async function getMovies(){const r=await fetch('/api/movies');if(!r.ok)throw Error('Movies unavailable');return (await r.json()).movies.map(decorate);}
function formatPrice(n){return '₹'+Number(n).toLocaleString('en-IN');}
function setupTheme(){const b=document.body;if(localStorage.cinebookTheme==='light')b.classList.add('light');document.querySelector('.theme-toggle')?.addEventListener('click',()=>{b.classList.toggle('light');localStorage.cinebookTheme=b.classList.contains('light')?'light':'dark';});}setupTheme();
