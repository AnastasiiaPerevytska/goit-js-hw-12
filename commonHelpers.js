import{a as q,i as u,S}from"./assets/vendor-b0d10f48.js";(function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const a of t.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function l(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function i(e){if(e.ep)return;e.ep=!0;const t=l(e);fetch(e.href,t)}})();const h=(r,s)=>q.get("https://pixabay.com/api/",{params:{key:"43795533-00e69c3734dde476e8d836fd2",q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:s,per_page:"15"}}),g=r=>r.map(({webformatURL:l,largeImageURL:i,tags:e,likes:t,views:a,comments:L,downloads:b})=>`<a class="gallery-item" href="${i}">
        <img class="gallery-image" src="${l}" alt="${e}" />
        <div class="info">
           <p class="info-item"><span>Likes:</span> ${t}</p>
           <p class="info-item"><span>Views:</span> ${a}</p>
           <p class="info-item"><span>Comments:</span> ${L}</p>
           <p class="info-item"><span>Downloads:</span> ${b}</p>
         </div>
       </a>`).join(""),d=document.querySelector(".search-form"),p=document.querySelector(".gallery"),m=document.querySelector(".loader"),f=document.querySelector(".loader-more"),o=document.querySelector(".load-btn");let n=1,y=1,c="";d.addEventListener("submit",async r=>{if(r.preventDefault(),c=d.elements.query.value.trim(),!!c){o.classList.contains("is-active")&&o.classList.remove("is-active"),p.innerHTML="",m.classList.add("is-active"),n=1;try{const{data:s}=await h(c,n);if(!s.total){m.classList.remove("is-active"),u.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"}),d.reset();return}p.innerHTML=`${g(s.hits)}`,m.classList.remove("is-active"),o.classList.add("is-active"),s.totalHits<15&&(o.classList.remove("is-active"),u.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."})),v.refresh()}catch(s){console.log(s)}}});o.addEventListener("click",async()=>{f.classList.add("is-active-more"),o.classList.remove("is-active");try{const{data:r}=await h(c,++n);p.insertAdjacentHTML("beforeend",`${g(r.hits)}`),f.classList.remove("is-active-more"),o.classList.add("is-active"),v.refresh(),window.scrollBy({top:720,behavior:"smooth"}),y=Math.ceil(r.totalHits/15),y===n&&(o.classList.remove("is-active"),u.info({position:"topRight",message:"We're sorry, but you've reached the end of search results."}))}catch(r){console.log(r)}});const v=new S(".gallery a",{navText:["&#5176;","&#5171;"],captionsData:"alt",captionDelay:250});
//# sourceMappingURL=commonHelpers.js.map