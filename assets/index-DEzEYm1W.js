(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[];async function t(){try{e=await(await fetch(`/events_2025/data.json`)).json(),n(e),a()}catch(e){console.error(`Error loading data:`,e)}}function n(e){let t=document.getElementById(`wedding-container`),n=document.getElementById(`obituary-container`),i=e.filter(e=>e.type===`wedding`),a=e.filter(e=>e.type===`obituary`);r(i,t,`경사`),r(a,n,`조사`)}function r(e,t,n){if(!t)return;if(e.length===0){t.innerHTML=`<p style="padding: 20px; color: #8B95A1;">데이터가 없습니다.</p>`;return}let r={};e.forEach(e=>{let t=(e.type===`wedding`?e.dateTime:e.diedDate).match(/(\d{4})[-년]\s*(\d{1,2})/),n=t?`${t[1]}년 ${parseInt(t[2])}월`:`기타`;r[n]||(r[n]=[]),r[n].push(e)});let i=Object.keys(r).sort((e,t)=>{let n=e.match(/(\d+)년\s+(\d+)월/),r=t.match(/(\d+)년\s+(\d+)월/);return!n||!r?0:parseInt(n[1])*100+parseInt(n[2])-(parseInt(r[1])*100+parseInt(r[2]))}),a=`
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th style="width: 80px;">구분</th>
                    <th>${n===`경사`?`신랑 ♡ 신부`:`고인명`}</th>
                    ${n===`조사`?`<th style="width: 120px;">성별/연령</th>`:``}
                    <th>${n===`경사`?`결혼식 일시`:`별세일`}</th>
                    <th>장소</th>
                    <th style="width: 120px;">관계</th>
                </tr>
            </thead>
            <tbody>
    `;i.forEach(e=>{a+=`
            <tr class="month-divider">
                <td colspan="${n===`조사`?7:6}">${e}</td>
            </tr>
        `,r[e].forEach(e=>{a+=`
                <tr onclick="showDetail(${e.id})">
                    <td>${e.id}</td>
                    <td style="font-weight: 600; color: ${e.type===`wedding`?`#0064FF`:`#4E5968`};">${e.typeLabel}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main);">${e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name}</td>
                    ${e.type===`obituary`?`<td>${e.genderAge}</td>`:``}
                    <td>${e.type===`wedding`?e.dateTime:e.diedDate}</td>
                    <td>${e.type===`wedding`?e.location:e.place}</td>
                    <td style="color: var(--toss-blue); font-weight: 600;">${e.relation||`-`}</td>
                </tr>
            `})}),a+=`</tbody></table>`,t.innerHTML=a}function i(t){let n=e.find(e=>e.id===t);if(!n)return;let r=document.getElementById(`modal`),i=document.getElementById(`modal-body`);n.type===`wedding`?i.innerHTML=`
            <div class="modal-detail-header">
                <h2 class="card-name">${n.groom} ♡ ${n.bride}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value" style="color: var(--toss-blue);">${n.typeLabel} | ${n.relation}</span>
                </div>
                <div>
                    <span class="info-label">일시</span>
                    <span class="info-value">${n.dateTime}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장소</span>
                <span class="info-value">${n.location}</span>
            </div>
        `:i.innerHTML=`
            <div class="modal-detail-header">
                <h2 class="card-name">${n.name}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value">${n.typeLabel} | ${n.genderAge} | ${n.relation}</span>
                </div>
                <div>
                    <span class="info-label">별세일</span>
                    <span class="info-value">${n.diedDate}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">유가족</span>
                <span class="info-value">${n.family}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">빈소</span>
                <span class="info-value">${n.place}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">발인일시</span>
                <span class="info-value">${n.funeralDate}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장지</span>
                <span class="info-value">${n.burialPlace}</span>
            </div>
        `,r.style.display=`block`,document.body.style.overflow=`hidden`}function a(){let e=document.getElementById(`modal`),t=document.querySelector(`.close-button`);t.onclick=()=>{e.style.display=`none`,document.body.style.overflow=`auto`},window.onclick=t=>{t.target==e&&(e.style.display=`none`,document.body.style.overflow=`auto`)}}window.showDetail=i,document.addEventListener(`DOMContentLoaded`,t)}))();