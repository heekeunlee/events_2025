(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin===`use-credentials`?t.credentials=`include`:e.crossOrigin===`anonymous`?t.credentials=`omit`:t.credentials=`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})(),((e,t)=>()=>(t||(e((t={exports:{}}).exports,t),e=null),t.exports))((()=>{var e=[];async function t(){try{e=await(await fetch(`/events_2025/data.json?v=${new Date().getTime()}`)).json(),n(e),d(),c()}catch(e){console.error(`Error loading data:`,e)}}function n(e){let t=document.getElementById(`wedding-container`),n=document.getElementById(`obituary-container`),r=e.filter(e=>e.type===`wedding`),a=e.filter(e=>e.type===`obituary`),c=document.querySelector(`#wedding-section .section-title`),l=document.querySelector(`#obituary-section .section-title`);c&&(c.textContent=`✨ 경사 (결혼식) - 총 ${r.length}건`),l&&(l.textContent=`🕯️ 조사 (장례식) - 총 ${a.length}건`),o(r,t,`경사`),o(a,n,`조사`),s(e),i(e)}function r(e){if(!e||!e.relation)return 15e4;let t=e.relation.trim();return e.id,t.includes(`매장 직원`)||t.includes(`가맹본부`)?3e5:t.includes(`사업 자문업체`)||t.includes(`인테리어 업체`)?25e4:t.includes(`협력 점주`)||t.includes(`납품업체`)||t.includes(`원두 공급업체`)||t.includes(`건물 관리사무소 관계자`)?2e5:15e4}function i(e){let t=document.getElementById(`image-gallery`);if(!t)return;let n=e.filter(e=>e.attachment);if(n.length===0){t.innerHTML=`<p style="color: var(--toss-text-muted);">첨부된 이미지가 없습니다.</p>`;return}t.innerHTML=n.map(e=>`
        <div class="gallery-item" onclick="showImage('${e.attachment}')">
            <div class="gallery-image-wrapper">
                <img src="/events_2025/${e.attachment}" alt="${e.name||e.groom}" loading="lazy">
            </div>
            <div class="gallery-info">
                <div class="gallery-name">${e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name}</div>
                <div class="gallery-date">${e.type===`wedding`?e.dateTime:e.diedDate}</div>
            </div>
        </div>
    `).join(``)}function a(e){return e.toLocaleString()}function o(e,t,n){if(!t)return;if(e.length===0){t.innerHTML=`<p style="padding: 20px; color: #8B95A1;">데이터가 없습니다.</p>`;return}let i={},o=0;e.forEach(e=>{let t=(e.type===`wedding`?e.dateTime:e.diedDate).match(/(\d{4})[-년]\s*(\d{1,2})/),n=t?`${t[1]}년 ${parseInt(t[2])}월`:`기타`;i[n]||(i[n]=[]),i[n].push(e),o+=r(e)});let s=Object.keys(i).sort((e,t)=>{let n=e.match(/(\d+)년\s+(\d+)월/),r=t.match(/(\d+)년\s+(\d+)월/);return!n||!r?0:parseInt(n[1])*100+parseInt(n[2])-(parseInt(r[1])*100+parseInt(r[2]))}),c=`
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
    `,l=1;s.forEach(e=>{let t=e.split(` `)[1]||e;i[e].forEach(e=>{let n=e.attachment?`<span class="attachment-icon" onclick="event.stopPropagation(); showImage('${e.attachment}')" title="이미지 보기">📎</span>`:`-`,i=r(e);c+=`
                <tr onclick="showDetail(${e.id})">
                    <td style="text-align: center;">${l++}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main); text-align: center;">${t}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main);">${e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name}</td>
                    ${e.type===`obituary`?`<td>${e.genderAge}</td>`:``}
                    <td>${e.type===`wedding`?e.dateTime:e.diedDate}</td>
                    <td>${e.type===`wedding`?e.location:e.place}</td>
                    <td style="font-weight: 600;">${e.relation||`-`}</td>
                    <td style="text-align: center;">${n}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--toss-text-main);">${a(i)}</td>
                </tr>
            `})}),c+=`
            </tbody>
            <tfoot>
                <tr class="table-footer-row">
                    <td colspan="${n===`조사`?8:7}" style="text-align: right; font-weight: 600; color: var(--toss-text-muted);">${n} 합계</td>
                    <td style="text-align: right; font-weight: 800; color: var(--toss-blue); font-size: 17px;">${a(o)}원</td>
                </tr>
            </tfoot>
        </table>`,t.innerHTML=c}function s(e){let t=document.getElementById(`total-amount`);t&&(t.textContent=a(e.reduce((e,t)=>e+r(t),0))+`원`)}function c(){let t=document.getElementById(`export-excel`),n=document.getElementById(`export-pdf`);!t||!n||(t.onclick=()=>{let t=e.map((e,t)=>{let n=r(e);return{번호:t+1,유형:e.type===`wedding`?`결혼`:`부고`,"대상/고인":e.type===`wedding`?`${e.groom} ♡ ${e.bride}`:e.name,날짜:e.type===`wedding`?e.dateTime:e.diedDate,장소:e.type===`wedding`?e.location:e.place,관계:e.relation,금액:n}}),n=XLSX.utils.json_to_sheet(t),i=XLSX.utils.book_new();XLSX.utils.book_append_sheet(i,n,`2025 경조사`),XLSX.writeFile(i,`2025_경조사_기록.xlsx`)},n.onclick=()=>{let e=document.getElementById(`app`);html2pdf().set({margin:10,filename:`2025_경조사_기록.pdf`,image:{type:`jpeg`,quality:.98},html2canvas:{scale:2,useCORS:!0},jsPDF:{unit:`mm`,format:`a4`,orientation:`portrait`}}).from(e).save()})}function l(t){let n=e.find(e=>e.id===t);if(!n)return;let i=document.getElementById(`modal`),o=document.getElementById(`modal-body`),s=r(n);n.type===`wedding`?o.innerHTML=`
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
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${a(s)}원</span>
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
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${a(s)}원</span>
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
        `,i.style.display=`block`,document.body.style.overflow=`hidden`}function u(e){let t=document.getElementById(`image-modal`),n=document.getElementById(`popup-image`);n.src=`/events_2025/${e}`,t.style.display=`block`,document.body.style.overflow=`hidden`}function d(){let e=document.getElementById(`modal`),t=document.getElementById(`image-modal`),n=document.querySelector(`.close-button`),r=document.getElementById(`close-image`);n&&(n.onclick=()=>{e.style.display=`none`,document.body.style.overflow=`auto`}),r&&(r.onclick=()=>{t.style.display=`none`,document.body.style.overflow=`auto`}),window.onclick=n=>{n.target==e&&(e.style.display=`none`,document.body.style.overflow=`auto`),n.target==t&&(t.style.display=`none`,document.body.style.overflow=`auto`)}}window.showDetail=l,window.showImage=u,document.addEventListener(`DOMContentLoaded`,t)}))();