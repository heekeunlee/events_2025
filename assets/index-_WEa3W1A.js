(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[];async function t(){try{e=await(await fetch(`/events_2025/data.json`)).json(),n(e),document.getElementById(`search-input`).addEventListener(`input`,r),a()}catch(e){console.error(`Error loading data:`,e);let t=document.getElementById(`obituary-body`);t&&(t.innerHTML=`<tr><td colspan="6" class="loader">데이터를 불러오는 중 오류가 발생했습니다.</td></tr>`)}}function n(e){let t=document.getElementById(`obituary-body`);if(t){if(e.length===0){t.innerHTML=`<tr><td colspan="6" class="loader">검색 결과가 없습니다.</td></tr>`;return}t.innerHTML=e.map(e=>`
        <tr onclick="showDetail(${e.id})">
            <td>${e.id}</td>
            <td style="font-weight: 600;">${e.name}</td>
            <td>${e.diedDate}</td>
            <td>${e.place}</td>
            <td>${e.funeralDate}</td>
            <td>${e.burialPlace}</td>
        </tr>
    `).join(``)}}function r(t){let r=t.target.value.toLowerCase();n(e.filter(e=>e.name.toLowerCase().includes(r)||e.family.toLowerCase().includes(r)||e.burialPlace.toLowerCase().includes(r)))}function i(t){let n=e.find(e=>e.id===t);if(!n)return;let r=document.getElementById(`modal`),i=document.getElementById(`modal-body`);i.innerHTML=`
        <div class="modal-detail-header">
            <h2 class="card-name" style="font-size: 2rem;">고 ${n.name} 님</h2>
            <p class="card-date" style="margin-bottom: 30px;">별세일: ${n.diedDate}</p>
        </div>
        <div class="modal-detail-item">
            <span class="info-label">유가족</span>
            <span class="info-value" style="font-size: 1.1rem;">${n.family}</span>
        </div>
        <div class="modal-detail-item">
            <span class="info-label">빈소</span>
            <span class="info-value" style="font-size: 1.1rem;">${n.place}</span>
        </div>
        <div class="modal-detail-item">
            <span class="info-label">발인일시</span>
            <span class="info-value" style="font-size: 1.1rem;">${n.funeralDate}</span>
        </div>
        <div class="modal-detail-item">
            <span class="info-label">장지</span>
            <span class="info-value" style="font-size: 1.1rem;">${n.burialPlace}</span>
        </div>
    `,r.style.display=`block`,document.body.style.overflow=`hidden`}function a(){let e=document.getElementById(`modal`),t=document.querySelector(`.close-button`);t.onclick=()=>{e.style.display=`none`,document.body.style.overflow=`auto`},window.onclick=t=>{t.target==e&&(e.style.display=`none`,document.body.style.overflow=`auto`)}}window.showDetail=i,document.addEventListener(`DOMContentLoaded`,t)}))();