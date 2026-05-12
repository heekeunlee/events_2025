(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[];async function t(){try{e=await(await fetch(`/events_2025/data.json`)).json(),n(e),document.getElementById(`search-input`).addEventListener(`input`,r),i()}catch(e){console.error(`Error loading data:`,e),document.getElementById(`obituary-grid`).innerHTML=`<div class="loader">데이터를 불러오는 중 오류가 발생했습니다.</div>`}}function n(e){let t=document.getElementById(`obituary-grid`);if(e.length===0){t.innerHTML=`<div class="loader">검색 결과가 없습니다.</div>`;return}t.innerHTML=e.map(e=>`
        <div class="obituary-card" onclick="showDetail(${e.id})">
            <div class="card-header">
                <h2 class="card-name">${e.name}</h2>
                <span class="card-date">별세: ${e.diedDate}</span>
            </div>
            <div class="card-info">
                <span class="info-label">장소</span>
                <span class="info-value">${e.place}</span>
            </div>
            <div class="card-info">
                <span class="info-label">발인</span>
                <span class="info-value">${e.funeralDate}</span>
            </div>
        </div>
    `).join(``)}function r(t){let r=t.target.value.toLowerCase();n(e.filter(e=>e.name.toLowerCase().includes(r)||e.family.toLowerCase().includes(r)||e.burialPlace.toLowerCase().includes(r)))}function i(){let e=document.getElementById(`modal`),t=document.querySelector(`.close-button`);t.onclick=()=>{e.style.display=`none`,document.body.style.overflow=`auto`},window.onclick=t=>{t.target==e&&(e.style.display=`none`,document.body.style.overflow=`auto`)}}document.addEventListener(`DOMContentLoaded`,t)}))();