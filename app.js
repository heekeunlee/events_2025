let allData = [];

async function init() {
    try {
        const baseUrl = import.meta.env.BASE_URL || '/';
        const response = await fetch(`${baseUrl}data.json?v=${new Date().getTime()}`);
        allData = await response.json();
        
        renderSections(allData);
        setupModals();
        setupExportButtons();
    } catch (error) {
        console.error('Error loading data:', error);
    }
}

function renderSections(data) {
    const weddingContainer = document.getElementById('wedding-container');
    const obituaryContainer = document.getElementById('obituary-container');
    
    const weddings = data.filter(item => item.type === 'wedding');
    const obituaries = data.filter(item => item.type === 'obituary');
    
    const weddingTitle = document.querySelector('#wedding-section .section-title');
    const obituaryTitle = document.querySelector('#obituary-section .section-title');
    if (weddingTitle) weddingTitle.textContent = `✨ 경사 (결혼식) - 총 ${weddings.length}건`;
    if (obituaryTitle) obituaryTitle.textContent = `🕯️ 조사 (장례식) - 총 ${obituaries.length}건`;

    renderSingleTable(weddings, weddingContainer, '경사');
    renderSingleTable(obituaries, obituaryContainer, '조사');
    
    renderTotalSummary(data);
    renderImageGallery(data);
}

function getAmountValue(item) {
    if (!item || !item.relation) return 100000;
    const rel = item.relation.trim();
    
    // --- UPDATED CALCULATION (Max 200,000, 50k unit) ---
    
    // Group 1: Core Internal/Business Partners (200,000)
    if (rel.includes('매장 직원') || rel.includes('가맹본부') || rel.includes('협력 점주')) {
        return 200000;
    }
    
    // Group 2: Key Supply/Service Partners (150,000)
    if (rel.includes('원두 공급업체') || rel.includes('납품업체') || rel.includes('인테리어 업체') || rel.includes('사업 자문업체')) {
        return 150000;
    }
    
    // Group 3: General Partners and Regular Customers (100,000)
    // Includes: 단골 단체 고객, 배달 플랫폼, 광고/마케팅, 건물 관리, 청소/방역, 장비 AS 등
    return 100000;
}

function renderImageGallery(data) {
    const galleryContainer = document.getElementById('image-gallery');
    if (!galleryContainer) return;
    
    const baseUrl = import.meta.env.BASE_URL || '/';
    const itemsWithImages = data.filter(item => item.attachment);
    
    if (itemsWithImages.length === 0) {
        galleryContainer.innerHTML = '<p style="color: var(--toss-text-muted);">첨부된 이미지가 없습니다.</p>';
        return;
    }
    
    galleryContainer.innerHTML = itemsWithImages.map(item => `
        <div class="gallery-item" onclick="showImage('${item.attachment}')">
            <div class="gallery-image-wrapper">
                <img src="${baseUrl}${item.attachment}" alt="${item.name || item.groom}" loading="lazy">
            </div>
            <div class="gallery-info">
                <div class="gallery-name">${item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name}</div>
                <div class="gallery-date">${item.type === 'wedding' ? item.dateTime : item.diedDate}</div>
            </div>
        </div>
    `).join('');
}

function formatNumber(num) {
    return num.toLocaleString();
}

function renderSingleTable(items, container, typeLabel) {
    if (!container) return;
    if (items.length === 0) {
        container.innerHTML = '<p style="padding: 20px; color: #8B95A1;">데이터가 없습니다.</p>';
        return;
    }

    const groups = {};
    let tableTotal = 0;

    items.forEach(item => {
        const dateStr = item.type === 'wedding' ? item.dateTime : item.diedDate;
        const match = dateStr.match(/(\d{4})[-년]\s*(\d{1,2})/);
        const month = match ? `${match[1]}년 ${parseInt(match[2])}월` : '기타';
        if (!groups[month]) groups[month] = [];
        groups[month].push(item);
        tableTotal += getAmountValue(item);
    });

    const sortedMonths = Object.keys(groups).sort((a, b) => {
        const aVal = a.match(/(\d+)년\s+(\d+)월/);
        const bVal = b.match(/(\d+)년\s+(\d+)월/);
        if (!aVal || !bVal) return 0;
        return (parseInt(aVal[1]) * 100 + parseInt(aVal[2])) - (parseInt(bVal[1]) * 100 + parseInt(bVal[2]));
    });

    const moneyColumnTitle = typeLabel === '경사' ? '축의금' : '부의금';

    let tableHtml = `
        <table>
            <thead>
                <tr>
                    <th style="width: 50px;">No</th>
                    <th style="width: 70px;">구분</th>
                    <th>${typeLabel === '경사' ? '신랑 ♡ 신부' : '고인명'}</th>
                    ${typeLabel === '조사' ? '<th style="width: 100px;">성별/연령</th>' : ''}
                    <th>${typeLabel === '경사' ? '일시' : '별세일'}</th>
                    <th>장소</th>
                    <th style="width: 100px;">관계</th>
                    <th style="width: 70px; text-align: center;">첨부</th>
                    <th style="width: 110px; text-align: right;">${moneyColumnTitle}</th>
                </tr>
            </thead>
            <tbody>
    `;

    let globalIndex = 1;

    sortedMonths.forEach(month => {
        const monthOnly = month.split(' ')[1] || month; 

        groups[month].forEach(item => {
            const attachmentHtml = item.attachment 
                ? `<span class="attachment-icon" onclick="event.stopPropagation(); showImage('${item.attachment}')" title="이미지 보기">📎</span>` 
                : '-';
            
            const amountVal = getAmountValue(item);

            tableHtml += `
                <tr onclick="showDetail(${item.id})">
                    <td style="text-align: center;">${globalIndex++}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main); text-align: center;">${monthOnly}</td>
                    <td style="font-weight: 600; color: var(--toss-text-main);">${item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name}</td>
                    ${item.type === 'obituary' ? `<td>${item.genderAge}</td>` : ''}
                    <td>${item.type === 'wedding' ? item.dateTime : item.diedDate}</td>
                    <td>${item.type === 'wedding' ? item.location : item.place}</td>
                    <td style="font-weight: 600;">${item.relation || '-'}</td>
                    <td style="text-align: center;">${attachmentHtml}</td>
                    <td style="text-align: right; font-weight: 700; color: var(--toss-text-main);">${formatNumber(amountVal)}</td>
                </tr>
            `;
        });
    });

    tableHtml += `
            </tbody>
            <tfoot>
                <tr class="table-footer-row">
                    <td colspan="${typeLabel === '조사' ? 8 : 7}" style="text-align: right; font-weight: 600; color: var(--toss-text-muted);">${typeLabel} 합계</td>
                    <td style="text-align: right; font-weight: 800; color: var(--toss-blue); font-size: 17px;">${formatNumber(tableTotal)}원</td>
                </tr>
            </tfoot>
        </table>`;
    container.innerHTML = tableHtml;
}

function renderTotalSummary(data) {
    const totalAmountElement = document.getElementById('total-amount');
    if (!totalAmountElement) return;
    const total = data.reduce((acc, item) => acc + getAmountValue(item), 0);
    totalAmountElement.textContent = formatNumber(total) + '원';
}

function setupExportButtons() {
    const excelBtn = document.getElementById('export-excel');
    const pdfBtn = document.getElementById('export-pdf');
    if (!excelBtn || !pdfBtn) return;

    excelBtn.onclick = () => {
        const dataForExcel = allData.map((item, index) => {
            const amount = getAmountValue(item);
            return {
                '번호': index + 1,
                '유형': item.type === 'wedding' ? '결혼' : '부고',
                '대상/고인': item.type === 'wedding' ? `${item.groom} ♡ ${item.bride}` : item.name,
                '날짜': item.type === 'wedding' ? item.dateTime : item.diedDate,
                '장소': item.type === 'wedding' ? item.location : item.place,
                '관계': item.relation,
                '금액': amount
            };
        });

        const worksheet = XLSX.utils.json_to_sheet(dataForExcel);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "2025 경조사");
        XLSX.writeFile(workbook, "2025_경조사_기록.xlsx");
    };

    pdfBtn.onclick = () => {
        const element = document.getElementById('app');
        const opt = {
            margin: 10,
            filename: '2025_경조사_기록.pdf',
            image: { type: 'jpeg', quality: 0.98 },
            html2canvas: { scale: 2, useCORS: true },
            jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf().set(opt).from(element).save();
    };
}

function showDetail(id) {
    const item = allData.find(o => o.id === id);
    if (!item) return;
    
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const amountVal = getAmountValue(item);
    
    if (item.type === 'wedding') {
        modalBody.innerHTML = `
            <div class="modal-detail-header">
                <h2 class="card-name">${item.groom} ♡ ${item.bride}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value" style="color: var(--toss-blue);">결혼 | ${item.relation}</span>
                </div>
                <div>
                    <span class="info-label">일시</span>
                    <span class="info-value">${item.dateTime}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장소</span>
                <span class="info-value">${item.location}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">축의금</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${formatNumber(amountVal)}원</span>
            </div>
        `;
    } else {
        modalBody.innerHTML = `
            <div class="modal-detail-header">
                <h2 class="card-name">${item.name}</h2>
                <div style="margin-bottom: 32px;">
                    <span class="info-label">유형</span>
                    <span class="info-value">부고 | ${item.genderAge} | ${item.relation}</span>
                </div>
                <div>
                    <span class="info-label">별세일</span>
                    <span class="info-value">${item.diedDate}</span>
                </div>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">부의금</span>
                <span class="info-value" style="font-weight: 700; color: var(--toss-blue);">${formatNumber(amountVal)}원</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">유가족</span>
                <span class="info-value">${item.family}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">빈소</span>
                <span class="info-value">${item.place}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">발인일시</span>
                <span class="info-value">${item.funeralDate}</span>
            </div>
            <div class="modal-detail-item">
                <span class="info-label">장지</span>
                <span class="info-value">${item.burialPlace}</span>
            </div>
        `;
    }
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function showImage(filename) {
    const imageModal = document.getElementById('image-modal');
    const popupImage = document.getElementById('popup-image');
    const baseUrl = import.meta.env.BASE_URL || '/';
    
    popupImage.src = `${baseUrl}${filename}`;
    imageModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function setupModals() {
    const modal = document.getElementById('modal');
    const imageModal = document.getElementById('image-modal');
    const closeBtn = document.querySelector('.close-button');
    const closeImageBtn = document.getElementById('close-image');
    
    if (closeBtn) {
        closeBtn.onclick = () => {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    if (closeImageBtn) {
        closeImageBtn.onclick = () => {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        };
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target == imageModal) {
            imageModal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    };
}

window.showDetail = showDetail;
window.showImage = showImage;
document.addEventListener('DOMContentLoaded', init);
