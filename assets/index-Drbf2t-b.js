(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[];async function t(){try{e=await(await fetch(`/events_2025/data.json`)).json(),n(e),l()}catch(e){console.error(`Error loading data:`,e)}}function n(e){let t=document.getElementById(`wedding-container`),n=document.getElementById(`obituary-container`),r=e.filter(e=>e.type===`wedding`),i=e.filter(e=>e.type===`obituary`),s=document.querySelector(`#wedding-section .section-title`),c=document.querySelector(`#obituary-section .section-title`);s&&(s.textContent=`✨ 경사 (결혼식) - 총 ${r.length}건`),c&&(c.textContent=`🕯️ 조사 (장례식) - 총 ${i.length}건`),a(r,t,`경사`),a(i,n,`조사`),o(e)}function r(e){if(!e||!e.relation)return 15e4;let t=e.relation.trim();return t.includes(`친척`)?3e5:t.includes(`직장 동료`)||t.includes(`교회 지인`)?e.id===1?25e4:2e5:(t.includes(`학교선후배`)||t.includes(`동호회 지인`),15e4)}function i(e){return e.toLocaleString()}function a(e,t,n){if(!t)return;if(e.length===0){t.innerHTML=`<p style="padding: 20px; color: #8B95A1;">데이터가 없습니다.</p>`;return}let a={},o=0;e.forEach(e=>{let t=(e.type===`wedding`?e.dateTime:e.diedDate).match(/(\d{4})[-년]\s*(\d{1,2})/),n=t?`${t[1]}년 ${parseInt(t[2])}월`:`기타`;a[n]||(a[n]=[]),a[n].push(e),o+=r(e)});let s=Object.keys(a).sort((e,t)=>{let n=e.match(/(\d+)년\s+(\d+)월/),r=t.match(/(\d+)년\s+(\d+)월/);return!n||!r?0:parseInt(n[1])*100+parseInt(n[2])-(parseInt(r[1])*100+parseInt(r[2]))}),c=`
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th style="width: 70px;">구분</th>
                    <th>${n===`경사`?`신랑 ♡ 신부`:`고인명`}</th>
                    ${n===`조사`?`<th style="width: 100px;">성별/연령</th>`:``}
                    <th>${n===`경사`?`일시`:`별세일`}</th>
                    <th>장소</th>
                    <th style="width: 100px;">관계</th>
                    <th style="width: 70px; text-align: center;">첨부</th>
                    <th style="width: 110px; text-align: right;">${n===`경사`?`축의금`:`부의금`}</th>
                </tr>
            </thead>
            <tbody>
    `,l=1;s.forEach(e=>{let t=e.split(` `)[1]||e;a[e].forEach(e=>{let n=e.attachment?`<span class="attachment-icon" onclick="event.stopPropagation(); showImage('${e.attachment}')" title="이미지 보기">📎</span>`:`-`,a=r(e);c+=`
                <tr onclick="showDetail(${e.id})">
                    <td style="text-align: center;">${l++}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main); text-align: center;">${t}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main);">${e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name}</td>
                    ${e.type===`obituary`?`<td>${e.genderAge}</td>`:``}
                    <td>${e.type===`wedding`?e.dateTime:e.diedDate}</td>
                    <td>${e.type===`wedding`?e.location:e.place}</td>
                    <td style="font-weight: 600;">${e.relation||`-`}</td>
                    <td style="text-align: center;">${n}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--toss-text-main);">${i(a)}</td>
                </tr>
            `})}),c+=`
            </tbody>
            <tfoot>
                <tr class="table-footer-row">
                    <td colspan="${n===`조사`?8:7}" style="text-align: right; font-weight: 600; color: var(--toss-text-muted);">${n} 합계</td>
                    <td style="text-align: right; font-weight: 800; color: var(--toss-blue); font-size: 17px;">${i(o)}원</td>
                </tr>
            </tfoot>
        </table>`,t.innerHTML=c}function o(e){let t=document.getElementById(`total-amount`);t&&(t.textContent=i(e.reduce((e,t)=>e+r(t),0))+`원`)}function s(t){let n=e.find(e=>e.id===t);if(!n)return;let a=document.getElementById(`modal`),o=document.getElementById(`modal-body`),s=r(n);n.type===`wedding`?o.innerHTML=`
            <div class="modal-detail-header">
                <h2 class="card-name">${n.groom} ♡ ${n.bride}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value" style="color: var(--toss-blue);">결혼 | ${n.relation}</span>
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
            <div class="modal-detail-item">
                <span class="info-label">축의금</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${i(s)}원</span>
            </div>
        `:o.innerHTML=`
            <div class="modal-detail-header">
                <h2 class="card-name">${n.name}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value">부고 | ${n.genderAge} | ${n.relation}</span>
                </div>
                <div>
                    <span class="info-label">별세일</span>
                    <span class="info-value">${n.diedDate}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">부의금</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${i(s)}원</span>
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
        `,a.style.display=`block`,document.body.style.overflow=`hidden`}function c(e){let t=document.getElementById(`image-modal`),n=document.getElementById(`popup-image`);n.src=`/events_2025/${e}`,t.style.display=`block`,document.body.style.overflow=`hidden`}function l(){let e=document.getElementById(`modal`),t=document.getElementById(`image-modal`),n=document.querySelector(`.close-button`),r=document.getElementById(`close-image`);n.onclick=()=>{e.style.display=`none`,document.body.style.overflow=`auto`},r.onclick=()=>{t.style.display=`none`,document.body.style.overflow=`auto`},window.onclick=n=>{n.target==e&&(e.style.display=`none`,document.body.style.overflow=`auto`),n.target==t&&(t.style.display=`none`,document.body.style.overflow=`auto`)}}window.showDetail=s,window.showImage=c,document.addEventListener(`DOMContentLoaded`,t)}))();