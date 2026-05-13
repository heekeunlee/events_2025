(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[];async function t(){try{e=await(await fetch(`/events_2025/data.json?v=${new Date().getTime()}`)).json(),i(e),l(),o()}catch(e){console.error(`Error loading data:`,e)}}function n(e){if(!e||!e.id)return 2e5;let t=e.id;return t===9||t===13?15e4:2e5}function r(e){return e.toLocaleString()}function i(e){let t=document.getElementById(`main-table-container`),i=document.getElementById(`total-count-title`);if(!t)return;if(e.length===0){t.innerHTML=`<p style="padding: 20px; color: #8B95A1;">데이터가 없습니다.</p>`;return}let o=[...e].sort((e,t)=>{let n=e.type===`wedding`?e.dateTime:e.diedDate,r=t.type===`wedding`?t.dateTime:t.diedDate;return new Date(n.replace(/-/g,`/`))-new Date(r.replace(/-/g,`/`))});if(i){let t=e.filter(e=>e.type===`wedding`).length,n=e.filter(e=>e.type===`obituary`).length;i.textContent=`전체 경비 내역 - 총 ${e.length}건 (결혼 ${t}건, 장례 ${n}건)`}let s=`
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th>이름</th>
                    <th style="width: 100px;">경조사</th>
                    <th>일시</th>
                    <th>관계</th>
                    <th>장소</th>
                    <th style="text-align: right;">금액</th>
                    <th>비고</th>
                    <th style="width: 60px; text-align: center;">첨부</th>
                </tr>
            </thead>
            <tbody>
    `,c=0;o.forEach((e,t)=>{let i=n(e);c+=i;let a=e.type===`wedding`?e.dateTime:e.diedDate,o=e.type===`wedding`?`결혼식`:`장례식`,l=e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name,u=e.type===`wedding`?e.location:e.place,d=``;d=e.type===`obituary`?`${e.genderAge||``} | 발인: ${e.funeralDate?.split(` `)[0]||``}`:`결혼 축하금`;let f=e.attachment?`<span class="attachment-icon" onclick="event.stopPropagation(); showImage('${e.attachment}')" title="증빙 서류 보기">📎</span>`:`-`;s+=`
            <tr onclick="showDetail(${e.id})">
                <td style="text-align: center; color: var(--toss-text-muted);">${t+1}</td>
                <td style="font-weight: 700; color: var(--toss-text-main);">${l}</td>
                <td style="font-weight: 600;">${o}</td>
                <td>${a}</td>
                <td>${e.relation||`-`}</td>
                <td>${u}</td>
                <td style="text-align: right; font-weight: 700; color: var(--toss-text-main);">${r(i)}</td>
                <td style="font-size: 13px; color: var(--toss-text-muted);">${d}</td>
                <td style="text-align: center;">${f}</td>
            </tr>
        `}),s+=`
            </tbody>
            <tfoot>
                <tr class="table-footer-row">
                    <td colspan="6" style="text-align: right; font-weight: 600; color: var(--toss-text-muted);">통합 경비 합계</td>
                    <td style="text-align: right; font-weight: 800; color: var(--toss-blue); font-size: 17px;">${r(c)}원</td>
                    <td colspan="2"></td>
                </tr>
            </tfoot>
        </table>`,t.innerHTML=s;let l=document.getElementById(`total-amount`);l&&(l.textContent=r(c)+`원`),a(e)}function a(e){let t=document.getElementById(`image-gallery`);if(!t)return;let n=e.filter(e=>e.attachment);if(n.length===0){t.innerHTML=`<p style="color: var(--toss-text-muted);">첨부된 증빙 서류가 없습니다.</p>`;return}t.innerHTML=n.map(e=>`
        <div class="gallery-item" onclick="showImage('${e.attachment}')">
            <div class="gallery-image-wrapper">
                <img src="/events_2025/${e.attachment}" alt="${e.name||e.groom}" loading="lazy">
            </div>
            <div class="gallery-info">
                <div class="gallery-name">${e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name}</div>
                <div class="gallery-date">${e.type===`wedding`?e.dateTime:e.diedDate}</div>
            </div>
        </div>
    `).join(``)}function o(){let t=document.getElementById(`export-excel`),r=document.getElementById(`export-pdf`);!t||!r||(t.onclick=()=>{let t=e.map((e,t)=>{let r=n(e);return{번호:t+1,"성명/대상":e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name,유형:e.type===`wedding`?`결혼`:`장례`,일시:e.type===`wedding`?e.dateTime:e.diedDate,관계:e.relation,장소:e.type===`wedding`?e.location:e.place,금액:r,비고:e.type===`obituary`?`${e.genderAge} | 발인: ${e.funeralDate}`:`결혼 축하`}}),r=XLSX.utils.json_to_sheet(t),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,r,`사업필요경비`),XLSX.writeFile(i,`2025_사업_필요_경비.xlsx`)},r.onclick=()=>{let e=document.getElementById(`app`);html2pdf().set({margin:10,filename:`2025_사업_필요_경비.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}}).from(e).save()})}function s(t){let i=e.find(e=>e.id===t);if(!i)return;let a=document.getElementById(`modal`),o=document.getElementById(`modal-body`),s=n(i);i.type===`wedding`?o.innerHTML=`
            <div class="modal-detail-header">
                <h2 class="card-name">${i.groom} ♡ ${i.bride}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value" style="color: var(--toss-blue);">결혼 | ${i.relation}</span>
                </div>
                <div>
                    <span class="info-label">일시</span>
                    <span class="info-value">${i.dateTime}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장소</span>
                <span class="info-value">${i.location}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">금액</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${r(s)}원</span>
            </div>
        `:o.innerHTML=`
            <div class="modal-detail-header">
                <h2 class="card-name">${i.name}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value">부고 | ${i.genderAge} | ${i.relation}</span>
                </div>
                <div>
                    <span class="info-label">별세일</span>
                    <span class="info-value">${i.diedDate}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">금액</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${r(s)}원</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">유가족</span>
                <span class="info-value">${i.family}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">빈소</span>
                <span class="info-value">${i.place}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">발인일시</span>
                <span class="info-value">${i.funeralDate}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장지</span>
                <span class="info-value">${i.burialPlace}</span>
            </div>
        `,a.style.display=`block`,document.body.style.overflow=`hidden`}function c(e){let t=document.getElementById(`image-modal`),n=document.getElementById(`popup-image`);n.src=`/events_2025/${e}`,t.style.display=`block`,document.body.style.overflow=`hidden`}function l(){let e=document.getElementById(`modal`),t=document.getElementById(`image-modal`),n=document.querySelector(`.close-button`),r=document.getElementById(`close-image`);n&&(n.onclick=()=>{e.style.display=`none`,document.body.style.overflow=`auto`}),r&&(r.onclick=()=>{t.style.display=`none`,document.body.style.overflow=`auto`}),window.onclick=n=>{n.target==e&&(e.style.display=`none`,document.body.style.overflow=`auto`),n.target==t&&(t.style.display=`none`,document.body.style.overflow=`auto`)}}window.showDetail=s,window.showImage=c,document.addEventListener(`DOMContentLoaded`,t)}))();